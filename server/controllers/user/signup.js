const { User } = require('../../models');
const util = require('util');
const crypto = require('crypto');

//promisify는  util의 내장된 메소드로 비동기화를 해주는 역할을 한다.
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  post: async (req, res) => {
    try {
      const {
        user_name,
        password,
        nickname,
        phone_number,
        shop_name,
        shop_category,
        shop_category_city,
        address_line1,
        address_line2,
        postal_code,
        email,
        is_master,
      } = req.body;
      //ismaster가 false 일 때
      if (is_master === false) {
        //고객으로 회원가입
        if (!user_name || !password || !nickname || !phone_number || !email) {
          return res
            .status(400)
            .send({ message: '필수항목을 모두 입력해주셔야 합니다.' });
        }
        //DB와 req.body가 중복되는지 확인
        const userNameInfo = await User.findOne({
          where: {
            user_name: user_name,
          },
        });
        const nickNameInfo = await User.findOne({
          where: {
            nickname: nickname,
          },
        });
        const emailInfo = await User.findOne({
          where: {
            email: email,
          },
        });
        //DB와 req.body가 중복된다면 실패처리하기
        if (userNameInfo) {
          //
          return res
            .status(403)
            .send({ message: '중복되는 아이디가 존재합니다.' });
        }
        if (nickNameInfo) {
          return res
            .stauts(403)
            .send({ message: '중복되는 닉네임이 있습니다.' });
        }
        if (emailInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 이메일이 있습니다.' });
        } else {
          // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
          const salt = crypto.randomBytes(64).toString('base64');
          // password를 salt를 첨가하여 sha512 알고리즘으로 305943번 해싱 후 64바이트 buffer 형식으로 반환
          const key = await pbkdf2Promise(password, salt, 305943, 64, 'sha512');
          // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
          const hashedPassword = key.toString('base64');

          await User.create({
            user_name: user_name,
            password: hashedPassword, // 해싱된 비밀번호
            user_salt: salt, // 유저 고유의 Salt값 DB에 저장 (추후 로그인에 필요)
            nickname: nickname,
            phone_number: phone_number,
            email: email,
            is_master: false,
          });

          return res.status(201).send({ message: '회원가입 완료' });
        }
      }
      if (is_master === true) {
        // 점주로 회원가입
        if (
          !user_name ||
          !password ||
          !nickname ||
          !phone_number ||
          !email ||
          !shop_name ||
          !shop_category ||
          !shop_category_city ||
          !address_line1

        ) {
          return res
            .status(400)
            .send({ message: '필수항목을 모두 입력해주셔야 합니다.' });
        }
        //DB와 req.body가 중복되는지 확인
        const userNameInfo = await User.findOne({
          where: {
            user_name: user_name,
          },
        });
        const nickNameInfo = await User.findOne({
          where: {
            nickname: nickname,
          },
        });
        const emailInfo = await User.findOne({
          where: {
            email: email,
          },
        });
        const shopNameInfo = await User.findOne({
          where: {
            shop_name: shop_name,
          },
        });
        //DB와 req.body가 중복된다면 실패처리하기
        if (userNameInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 아이디가 존재합니다.' });
        }
        if (nickNameInfo) {
          return res
            .stauts(403)
            .send({ message: '중복되는 닉네임이 있습니다.' });
        }
        if (emailInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 이메일이 있습니다.' });
        }
        if (shopNameInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 가게이름이 존재합니다.' });
        } else {
          // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
          const salt = crypto.randomBytes(64).toString('base64');
          // password를 salt를 첨가하여 sha512 알고리즘으로 305943번 해싱 후 64바이트 buffer 형식으로 반환
          const key = await pbkdf2Promise(password, salt, 305943, 64, 'sha512');
          // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
          const hashedPassword = key.toString('base64');

          await User.create({
            user_salt: salt, // 유저 고유의 Salt값 DB에 저장 (추후 로그인에 필요)
            user_name: user_name,
            password: hashedPassword, // 해싱된 비밀번호
            nickname: nickname,
            phone_number: phone_number,
            shop_name: shop_name,
            shop_category: shop_category,
            shop_category_city: shop_category_city,
            address_line1: address_line1,
            address_line2: address_line2,
            postal_code: postal_code,
            email: email,
            is_master: true,
          });
          return res.status(201).send({ message: '회원가입 완료' });
        }
      }
    } catch (err) {
      res.status(500).send({ message: '서버 에러' });
    }
  },
};