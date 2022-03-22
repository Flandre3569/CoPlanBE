const config = require('../app/config')
const nodemailer = require('nodemailer'); //引入模块
let transporter = nodemailer.createTransport({
    //node_modules/nodemailer/lib/well-known/services.json  查看相关的配置，如果使用qq邮箱，就查看qq邮箱的相关配置
	service: 'qq', //类型qq邮箱
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: '1332726596@qq.com', // 发送方的邮箱
		pass: config.EMAIL_STMP // smtp 的授权码
	}
});

function sendMail(mail, code, call) {
	// 发送的配置项
	let mailOptions = {
		from: '"Coisini" <1332726596@qq.com>', // 发送方
		to: mail, //接收者邮箱，多个邮箱用逗号间隔
		subject: '欢迎使用"CoPlan"', // 标题
		// text: '感谢订阅CoPlan,我们会把第一手消息通知您哦~', // 文本内容
		html: `
			<h2>这里是"co-plan"</h2>
			<span>我们会把更新内容第一时间发送给您哦🥳🎉🎉</span>
			<p>🪐若您想了解更多, 请点击: <a href="http://mingxuan3569.xyz">CoPlan & record...</a></p>
		`, //页面内容
		// attachments: [{//发送文件
		// 		filename: 'index.html', //文件名字
		// 		path: './index.html' //文件路径
		// 	},
		// 	{
		// 		filename: 'sendEmail.js', //文件名字
		// 		content: 'sendEmail.js' //文件路径
		// 	}
		// ]
	};

	//发送函数
	transporter.sendMail(mailOptions, (error, info) => {
		console.log(error);
		if (error) {
			call(false)
		} else {
			call(true) //因为是异步 所有需要回调函数通知成功结果
		}
	});

}

module.exports = {
	sendMail
}

