const router = require("express").Router();
const main = require("../controllers/main");

/**
 * @swagger
 * tags:
 *   name: main
 *   description: 메인 페이지 조회
 */

router.get("/", main.main.get);
router.get("/shop/:id", main.shop.get);

/**
 * @swagger
 * paths:
 *  /:
 *    get:
 *      summary: "메인 페이지 데이터 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [main]
 *      responses:
 *        "200":
 *          description: 정보 전달 완료
 *        "400":
 *          description: 자료 조회 실패
 */

/**
 * @swagger
 * paths:
 *  /shop/:id:
 *    get:
 *      summary: "가게 상세 정보 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [main]
 *      responses:
 *        "200":
 *          description: 정보 전달 완료
 *        "400":
 *          description: 자료 조회 실패
 */
module.exports = router;
