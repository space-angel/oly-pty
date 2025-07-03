// TaggedSnsPosts organism: SNS 게시물 리스트 섹션 컴포넌트
// 아토믹 디자인 - Organisms
// ---------------------------------------------
//
import React from "react";
import SnsPostCard from "./SnsPostCard";

const dummyPosts = [
  {
    id: '8140bfc9b49f4a0987898260a76071c0',
    image: 'https://cf-images.oliveyoung.co.kr/shutter/post/2025/06/08/40d22dd5b2384c94ac7d8468329a2fc8_082627.webp?RS=320x0&QT=85&SF=webp',
    tags: ['여름쿨톤', '각질'],
    desc: '드디어 여름이 왔는데요••• 🥵더운 날씨에는 더욱 뽀송한 베이스가 중요하죠••?!이럴때 하면 좋은 필승 조합 소개드립니다 !',
    likes: 7
  },
  {
    id: 'b5e1228e3b86486296b7f5f16af11536',
    image: 'https://cf-images.oliveyoung.co.kr/shutter/post/2025/06/24/1984cfb1aa04440e9f55ac4461cf4785_101056.webp?RS=320x0&QT=85&SF=webp',
    tags: ['여름쿨톤', '잡티'],
    desc: '☔️장마철을 앞두고 뽀송~하게 마무리되는 밀착베이스 메이크업을 시도중인 요즘, 써보고 추천해드릴 것만 가져와봤어요!\n\n🐽일단 베이스를 제대로 하려면 피지부터 녹여야겠죠?\n피지연화제로 코를 녹여봤는데(?) 진짜 블랙헤드가 녹은건지 뭔지 코가 깨끗해서져 깜놀,,, 코 옆부분에 화장 뜨고 끼임있었던 게 없어져서 진짜 좋았어요!\n+ 프라이머를 스패츌러로 해주는 게 저의 Kick🦶🏻\n+ 마무리는 모공삭제 파우더로 유분 많은 부위에 콩!콩!\n일단 요렇게 하면 뭘 발라도 뽀송매끈하게 밀착되는 것 같더라구요ㅎ,ㅎ\n\n그럼 우리 장마에도 무너지지않는 뽀송함 가져가보자구요?!😉\n',
    likes: 2
  },
  {
    id: '73de304f23cf4dc0aa000eb35891f6cd',
    image: 'https://cf-images.oliveyoung.co.kr/shutter/post/2025/06/01/b151a707ce444ef9939a0e0ee9823e65_201827.webp?RS=320x0&QT=85&SF=webp',
    tags: [],
    desc: '평소에 쨍한 메이크업을 좋아하지 않은 저는 자연스러우면서도 글로시한 럭키비키 워녕st로 데일리 메이크업을 하고 있어요!\n행사가 있을땐 데일리보다 쪼끔 발색있는 제품을 사용합니다!\n.\n기초-세안 후 메디힐 패드팩으로 촉촉하게 해주고 아누아 어성초 토너, 에스네이처수분크림을 사용해요! 수분감을 채워주고 언작 메이크업 베이스로 물광 피부 연출을 해주어요! 마무리로 쏘내추럴 픽서로🩷\n.\n색조- 클리오 컨실러로 잡티 한번 터치 해주고, 어뮤즈 파운데이션을 피카소 스파츌라로 얇게 발라줍니다. 피카소 스펀지로 두둘겨 주고 수정화장은 클리오 팩트로 가볍게 터치해주어요!!\n눈썹은 에스쁘아 브로우로, 아이라인은 키스미, 애굣살은 디어달리아 제품을 사용해요! 입술은 라네즈 립마스크로 촉촉하게 만들어준 후 바닐라코 블럼퍼 틴트, 롬엔 립글로즈로 마무리 해줍니다:) 블러셔는 에뛰드 코랄 제품써요 ㅎ ㅎ 또 한번의 픽서를 뿌려줍니다! \n.\n헤어제품은 제이숲 샴푸, 제이숲 헤어스프레이 이렇게 사용합니다! \n\n처음부터 마무리까지 다 올리브영에서 구매했던 제품을 사용합니다🩷💜\n\n개인적으로 언작 베이스랑 클리오 팩트, 롬엔 립글로즈 추천합니다 강츄!!!✨',
    likes: 6
  },
  {
    id: '3339ba15cda442a1924891446b9d6cf1',
    image: 'https://cf-images.oliveyoung.co.kr/shutter/post/2025/06/09/b2c3759b1f8249348530f10271e09a74_142918.webp?RS=320x0&QT=85&SF=webp',
    tags: ['쿨톤', '잡티'],
    desc: '여름을 맞아 습하고 끈적한 피부 탈출하기 ✨\n여름에는 아무래도 촉촉한 베이스 보다는 살짝 매트한 베이스를 써야 피부 표현이 자연스럽더라구요 !\n뽀송하면서 뽀용한 피부까지 연출 가능한 베이스 🌸\n태그에 사용한 제품들 걸어둘게요!',
    likes: 1
  },
  {
    id: '1c6d46d2830141248882e709fe32ca5a',
    image: 'https://cf-images.oliveyoung.co.kr/shutter/post/2025/05/29/c8107a21d57045278d532220893ed57a_012220.webp?RS=320x0&QT=85&SF=webp',
    tags: [],
    desc: '🌞💄 Summer Makeup #내돈내산비교 💄🌞\n여름엔 뽀송함이 생명이잖아요?\n그래서 진짜 내 돈 주고 써본 올리브영 인기템들만 모아서 여름 메이크업 꿀조합 소개할게요! 🛍️💕\n\n🍓 베이스 라인업 🍓\n🧊 VDL 톤 스테인 프라이머\n→ 톤보정 + 쿨링감까지!\n내 피부가 갑자기 기분 좋아지는 느낌… (특히 블루컬러 완전 추천💙)\n\n🌼 바닐라코 프라임 프라이머 스누피 에디션\n→ 이건 그냥 패키지에 1차로 심쿵하고,\n모공 싹~ 매끈하게 잡아줘서 2차 심쿵…🐶\n\n🌈 웨이크메이크 스테이 픽서 멀티 컬러 파우더\n→ 컬러별로 맞춤 진정 가능!\n티존은 민트, 볼은 라벤더로 쏙쏙~ 여름 화장 무너짐 예방템이에요!\n\n🍑 쿠션은?\n🎀 클리오 킬커버 글로우 에센셜 쿠션 (토이스토리 콜라보)\n→ 수분감 가득 + 은은광✨\nLotso 파우치까지 있으니까 기분도 텐션 업! 🍓\n\n🍒 틴트는 역시\n💋 롬앤 주시 래스팅 틴트\n→ 물먹은 입술처럼 착붙!\n하루종일 예쁘고 지속력 미쳤어요.. 안지워지는 틴트 찾는다면 이거 Pick!\n\n⸻\n\n💗 총정리 💗\n✅ 번들거림 ❌\n✅ 무너짐 ❌\n✅ 지속력 + 모공커버 + 수분광 ✔️\n\n👉🏻 이 조합 진심 여름 찐조합이에요!',
    likes: 4
  },
  {
    id: '70bddc27f4e54324b804a9a78194ae85',
    image: 'https://cf-images.oliveyoung.co.kr/shutter/post/2025/06/06/9de820f5a087411983bc7030a5abd000_234235.webp?RS=320x0&QT=85&SF=webp',
    tags: ['봄웜톤', '잡티'],
    desc: '클리오 신상 킬커버 메쉬 블러 쿠션 🫧🤍\n21C 란제리 사용해줬어요!\n클리오 다른 쿠션들도 란제리 컬러가 저한테 딱 맞아욥 흐 ㅋ\n\n건성인 내 피부도 보송보송하게 만들어줘서\n올 여름 정착템 예정🥹\n열일하는 클리오가 더 열일했다🫣',
    likes: null
  },
  {
    id: '479f47b3209343f29e9979fe28576de2',
    image: 'https://cf-images.oliveyoung.co.kr/shutter/post/2025/06/05/a0e86e595f0c4f69807278ac7d59d7a9_234035.webp?RS=320x0&QT=85&SF=webp',
    tags: ['가을웜톤', '미백'],
    desc: '골져스한 분위기에 걸맞게 평소 도전 안 하던 글로우 메이크업에 도전해 봤어요💗✨🌟 \n아무래도 평소 매트한 피부표현을 선호하다보니 베이스까지 글로우하게 연출하기엔 무리겠다싶어 블러셔, 하이라이터, 립 제품으로 연출 성공💓 \n• "어뮤즈 립앤치크 헬시밤"\n글로우 메이크업은 부담스러운데 슬쩍 도전해보고 싶다 하시면 완전전 강추!!! 저는 미니 쿠션퍼프를 이용해서 바르는데 은은한 광이 부담스럽지 않게 너무 이쁘게 연출 돼요🤍�� \n•"컬러그램 탕후루 탱글 틴트"\n이 제품은 저번 셔터 게시글에서도 소개했던 제품인데요!! 투명 컬러를 구매하면 어떤 립에든 챡 올려 원할 때 글로우립을 연출할 수 있어 꼭꼭 가지고 다니는 아이템이에요❤️ 완전 강추!!ㅔ\n',
    likes: null
  }
];

const styles = {
  container: {
  },

  postHeader: {
    alignItems: "center",
    padding: "0px 15px",
    justifyContent: "space-between",

  },

  title: {
    display: "flex",
    flex: 1,
    fontSize: 16,
    fontWeight: 700,
    color: "#222",
  },

  list: {
    display: "flex",
    gap: 10,
    padding: "0px 15px 24px 15px",
    overflowX: 'auto' as const,
    flexWrap: 'nowrap' as const,
  },

};

const TaggedSnsPosts = () => (
  <div style={styles.container}>

    <div style={styles.postHeader}>
      <h2 style={styles.title}>이 상품을 태그한 셔터 게시물</h2>
    </div>

    <div style={styles.list} className="sns-list">
      {dummyPosts.map((post) => (
        <SnsPostCard key={post.id} {...post} />
      ))}
    </div>

  </div>
);

export default TaggedSnsPosts; 