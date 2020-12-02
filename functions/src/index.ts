import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
// import * as cors from 'cors';
// import { CorsOptions } from 'cors';

// const corsOptions: CorsOptions = 
// {
//     origin: [
//         'http://localhost:3000',
//         'https://your-turn-b96fd.web.app'
//       ],
// }
// const corsHandler = cors({options: corsOptions})

function getTodayString() {
    const japanDate = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    var now = new Date(japanDate);
    var month =  ("0"+(now.getMonth()+1)).slice(-2);
    var day =  ("0"+now.getDate()).slice(-2);
    return now.getFullYear() + month + day;
}

const firebaseConfig = {
    apiKey: "AIzaSyBFjxU29wO_8R2EE4o-XSD5fffetxHUGAk",
    authDomain: "your-turn-b96fd.firebaseapp.com",
    databaseURL: "https://your-turn-b96fd.firebaseio.com",
    projectId: "your-turn-b96fd",
    storageBucket: "your-turn-b96fd.appspot.com",
    messagingSenderId: "59882471523",
    appId: "1:59882471523:web:ec5573b2712b6d19d9f856",
    measurementId: "G-24Y45RTJSZ"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

interface BookingRecord {
    key: string;
    bookingData: BookingData;
}

interface UserInfo {
    displayName: string;
    signinDate: string;
  }

interface BookingConfig {
    photoUrl: string;
    open_time1: string;
    close_time1: string;
    open_time2: string;
    close_time2: string;
    title: string;
    notes: string;
    bookingFlg: boolean;
    flgDate: string;
    phone_number: string;
    mail_sign: string;
  }

interface BookingData {
    id: string;
    orderNumber: number;
    medical_number: string;
    status: number;
    name: string;
    email: string;
    number: number;
    waiting_count: number;
    pet_name1: string;
    content1: string;
    pet_name2: string;
    content2: string;
    pet_name3: string;
    content3: string;
    pet_name4: string;
    content4: string;
    pet_name5: string;
    content5: string;
    date: string;
    time: string;
    directBooked: boolean;
    mailGuided: boolean;
  }

// interface BookingPair {
//     key: string;
//     value: any;
// }

const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
        }
    })
admin.initializeApp(firebaseConfig);

export const sendAcceptedEmail = functions.database.ref('/bookings/{book_id}/{date}/{record_id}').onCreate((change, context) => {
    let data: BookingData = change.val();
    console.log(data)
    if(data && data.email && data.email !== '') {
        const userId = context.params.book_id;
        var configRef = firebase.database().ref('/config/' + userId);
        configRef.once('value', (records) => {
            let bookingConfig: BookingConfig | null = null
            if (records.exists()) { 
                bookingConfig = records.val();
            }
            let email = {
                from: gmailEmail,
                to: data.email,
                subject: "診療予約受付　Your-Turn",
                text: data.name 
                +  " 様\n\n"
                +  "この度はオンライン受付システムYour-Turnをご利用いただき誠にありがとうございます。\n"
                +  "診療予約の受付が完了しました。\n"
                +  "受付番号: " + data.orderNumber + "\n\n"
                +  "お呼び出し順番が近づいてきましたらメールにてお知らせいたします。\n"
                +  "ご来院の際は受付スタッフにWEBで受付をした旨をお伝えください。\n"
                +  "ご来院をお待ちしております。\n\n"
                +  "＜注意事項＞\n"
                +  "・急な都合で「受付」をキャンセルする場合は当院まで電話にてご連絡をお願いします。\n"
                + ((bookingConfig && bookingConfig.phone_number) ? "　　tel." + bookingConfig?.phone_number + '\n' : '')
                +  "・お呼びした時にご来院されていない場合はお待ちいただくことになります。\n"
                +  "・診療の受付時間が終了している時間にお呼びしていらっしゃらない場合は、受付取消となります。\n"
                +  "・症状や診療内容によりお呼びする順番が変わることがあります。\n"
                +  "・待ち人数が設定した人数以下の場合は「呼び出しメール」は届きません。予約受付画面から現在のお呼び出し番号が確認できますのでご自身で随時確認をお願いいたします。\n"
                +  "・基本的にはご予約いただいた順番（番号）通りにお呼びしております。（例：５番の次は６番をお呼び出し）\n"
                +  "※ 本メールに返信することはできません。\n"
                + ((bookingConfig && bookingConfig.mail_sign)? "\n" + bookingConfig?.mail_sign : '')
            }
            console.log("target:" + email);

            try {
                mailTransport.sendMail(email);
            } catch (e) {
                console.error(`send failed. ${e}`);
                throw new functions.https.HttpsError('internal', 'send failed');
            }
          }, function(error) {
            console.log('Error Getting Config: ' + error.message);
            throw new functions.https.HttpsError('internal', error.message);
          }
        );
    } else {
        console.log("there is no target email.")
    }
    return ''
});

export const sendAutoOrderEmail = functions.database.ref('/bookings/{book_id}/{date_str}/{record_id}/status').onWrite((change, context) => {
    
    const userId = context.params.book_id;
    var ref = firebase.database().ref('/bookings/' + userId + "/" + getTodayString());
    ref.once('value', (records) => {
        // メール送信対象の取得
        var list: BookingRecord[] = [];
        if (records.exists()) {
            let waitingCount = 0;
            records.forEach(snapshot => {
                let key = snapshot.key;
                let data: BookingData = snapshot.val();
                let record: BookingRecord = {key: key ? key : '', bookingData: data};
                if (data.status === 0 || data.status === 1 || data.status === 2) {
                    // console.log(record);
                    // console.log('status:' + data.status + ' targetCount:' + targetCount);
                    if (data.status === 0 && data.mailGuided === false && data.email && data.email !== '' && waitingCount <= data.waiting_count) {
                        list.push(record);
                    }

                    waitingCount++;
                }
            });

            // console.log('target count: ' + list.length);
            var configRef = firebase.database().ref('/config/' + userId);
            configRef.once('value', (records) => {
                let bookingConfig: BookingConfig | null = null;
                if (records.exists()) { 
                    bookingConfig = records.val();
                }

                // メールの送信
                if (list.length > 0) {
                    list.forEach(booking => {
                        let email = {
                            from: gmailEmail,
                            to: booking.bookingData.email,
                            subject: "ご来院のお知らせ　Your-Turn",
                            text: booking.bookingData.name 
                            + " 様\n\n"
                            + "ご予約の受付順番が近づいています。\n"
                            + "ご来院くださいますようお願いいたします。\n\n"
                            + "＜注意事項＞\n"
                            + "・急な都合で「受付」をキャンセルする場合は当院まで電話にてご連絡をお願いします。\n"
                            + ((bookingConfig && bookingConfig.phone_number) ? "　　tel." + bookingConfig?.phone_number + '\n' : '')
                            + "・お呼びした時にご来院されていない場合はお待ちいただくことになります。\n"
                            + "・診療の受付時間が終了している時間にお呼びしていらっしゃらない場合は、受付取消となります。\n"
                            + "※ 本メールに返信することはできません。\n"
                            + ((bookingConfig && bookingConfig.mail_sign)? "\n" + bookingConfig?.mail_sign : '')
                        }

                        try {
                            mailTransport.sendMail(email);
                            var bookRef = firebase.database().ref('/bookings/' + userId + "/" + getTodayString() + "/" + booking.key);
                            bookRef.update({mailGuided: true});
                        } catch (e) {
                            console.error(`send failed. ${e}`);
                            throw new functions.https.HttpsError('internal', 'send failed');
                        }
                    });
                } else {
                    console.log('there is no target to send guidunce mail')
                }
            }, function(error) {
                console.log('Error Getting Config: ' + error.message);
              }
            );
        }
    });
    return ''
});

interface WaitingInfo {
    checking_number: number,
    waiting_count: number,
    booking_acceptance: boolean
}

export const getWaitingInfo = functions.https.onRequest((request, response) => {
    try {
    if (request.query.id !== undefined) {
      let userId = request.query.id
      let waitingInfo: WaitingInfo = {waiting_count:0, checking_number:0, booking_acceptance: false };
      var ref = firebase.database().ref('/bookings/' + userId + "/" + getTodayString());
      ref.once('value', (records) => {
        // console.log(records);
            // メール送信対象の取得
            var list: BookingData[] = [];
            if (records.exists()) {
                
                records.forEach(snapshot => {
                    let data: BookingData = snapshot.val();
                    if (data.status === 0) {
                        list.push(data);
                    }
                });
                waitingInfo.waiting_count = list.length;
                let checkNum: number = 0;
                if (list.length > 0) checkNum = list[0].orderNumber;
                waitingInfo.checking_number = checkNum;
            } else {
                console.log('there is no record');
            }

            // 受付中判定
            var configRef = firebase.database().ref('/config/' + userId);
            configRef.once('value', (records) => {
                if (records.exists()) {
                    let bookingConfig: BookingConfig = records.val();
                    // console.log('bookingConfig');
                    // console.log(bookingConfig);
                    var userRef = firebase.database().ref('/users/' + userId);
                    userRef.once('value', (userRecord) => {
                        if (userRecord.exists()) {
                            let userInfo: UserInfo = userRecord.val();
                            // console.log('userInfo');
                            // console.log(userInfo);
                            waitingInfo.booking_acceptance = (getBookingDisabled(bookingConfig, userInfo) === false);
                        } 

                        let jsonStr= JSON.stringify(waitingInfo);
                        // console.log('response:' + jsonStr);
                        response.status(200).send(jsonStr);
                        
                    }, function(error) {
                        console.log('Error Getting User: ' + error.message);
                        response.status(500).send(error.message);
                    }    
                    )
                } else {
                    let jsonStr= JSON.stringify(waitingInfo);
                    console.log('there is no config:' + jsonStr)
                    response.status(200).send(jsonStr)
                }
                
            }, function(error) {
                console.log('Error Getting Config: ' + error.message);
                response.status(500).send(error.message);
              }
            );
          }, function(error) {
            console.log('Error Getting Bookings: ' + error.message);
            response.status(500).send(error.message);
          }
        )
    } else {
        console.log('wrong user id');
        response.status(200).send("")
    }
    } catch (e) {
        console.log('Error: ' + e);
        response.status(500).send("")
   }
})

const getBookingDisabled = (bookingConfig: BookingConfig, userInfo: UserInfo) => {
    let temporaryFlg = false;
    const japanDate = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    var now = new Date(japanDate);
    var month =  ("0"+(now.getMonth()+1)).slice(-2);
    var day =  ("0"+now.getDate()).slice(-2);
    var hour =  ("0"+now.getHours()).slice(-2);
    var min =  ("0"+now.getMinutes()).slice(-2);
    var sec =  ("0"+now.getSeconds()).slice(-2);
    const date = now.getFullYear() + "/" + month + "/" + day;
  
    if(!bookingConfig) {
        console.log("config has not been made")
        return true;
    }

    if (bookingConfig.bookingFlg && bookingConfig.flgDate === date) {
        temporaryFlg = true;
    }
  
    // 受付時間判定
    let ontime = false;
    const time = hour + ":" + min + ":" + sec;
    console.log('time:' + time)
    if (time >= bookingConfig.open_time1　+ ":00" && time <= bookingConfig.close_time1　+ ":00" ||
    time >= bookingConfig.open_time2　+ ":00" && time <= bookingConfig.close_time2　+ ":00" ) {
        ontime = true;
    }
    // 管理者のログイン判定
    let loggedinToday = (userInfo?.signinDate && userInfo?.signinDate === getTodayString());
    if (loggedinToday) {
        if (temporaryFlg) {
            console.log('booking has been stopped by temporary setting')
            return true;
        } else {
            if (ontime) { 
                console.log('booking is openning')
                return false;
            } else {
                console.log('booking is out of the opening hours')
                return true;
            }
        }
    } else {
        console.log('admin has not logged in today')
        return true;
    }   
};

export const sendPersonalEmail = functions.https.onCall(async (data, context) => {
    // corsHandler(request, response, () => {
    // functions.logger.info("Start to send an email", {structuredData: true});
    console.log("Start to send an email:");
    console.log(data);
    
    let email = {
        from: gmailEmail,
        to: data.mail.to,
        subject: data.mail.subject,
        text: data.mail.content
    }

    try {
        await mailTransport.sendMail(email);
    } catch (e) {
        console.error(`send failed. ${e}`);
        throw new functions.https.HttpsError('internal', 'send failed');
    }

    return '';
});


