import styles from './IntroHistory.module.css';
import styled from 'styled-components';

const Li = styled.li`
  width: 100%;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-bright-stroke);
`;

const Span = styled.span`
  color: var(--color-primary);
  font-family: 'Pretendard Bold' !important;
`;

function IntroHistory() {
  return (
    <div className={styles.History}>
      <p className={styles.HistoryTitle}>HISTORY</p>
      <ul className={styles.HistoryUL}>
        <Li>
          <Span>1995 CRA (전산연구회) 창립</Span> 🎉
        </Li>

        <Li>1997 인트라넷 1.0 초기 버전 완성 및 학교 배포</Li>

        <Li>
          1999 인트라넷 2.0 <Span>i2</Span> 완성
          <p className={styles.HistoryListElement}>
            i2 - 정보통신 소프트웨어 공모대전 학생부 우수상 수상
          </p>
        </Li>

        <Li>
          2006 인트라넷 3.0 <Span>i3</Span> 완성
        </Li>

        <Li>2010 Wizard XE - 제 1회 XE 공모전 대상 수상</Li>

        <Li>
          2011 &apos;그룹지향형 소셜네트워크 서비스&apos; 공개 소프트웨어 개발자
          대회 기업상 수상
          <p className={styles.HistoryListElement}>
            인트라넷 i3 &rarr; <Span>i7</Span> 업그레이드
          </p>
          <p className={styles.HistoryListElement}>하/동계 C 캠프 주관</p>
        </Li>

        <Li>
          2012 제24회 글로벌 소프트웨어 공모대전 삼성SDS 사장상
          <p className={styles.HistoryListElement}>하/동계 C 캠프 주관</p>
          <p className={styles.HistoryListElement}>
            공학교육페스티벌 한동대학교 대표 동아리 참가, 작품 출품(앤톡)
          </p>
        </Li>

        <Li>
          2013 동계 C 캠프 주관
          <p className={styles.HistoryListElement}>
            삼성 software membership 2기
          </p>
          <p className={styles.HistoryListElement}>
            미래창조과학부 캠퍼스 CEO 육성사업, 게임 <Span>킹덤셀</Span>
            제작
          </p>
        </Li>

        <Li>2014 동계 C 캠프 주관</Li>

        <Li>
          2015 전공체험활동 프로그램, 전산전자공학부 진행
          <p className={styles.HistoryListElement}>
            동아리 홍보 및 리쿠르팅 플랫폼 <Span>iBelong</Span> 웹 서비스 출시
          </p>
          <p className={styles.HistoryListElement}>
            학점 계산 서비스 <Span>iGrad</Span> 웹 서비스 출시
          </p>
        </Li>

        <Li>
          2016 동계 C 캠프<Span> &quot;Come and C!&quot;</Span> 주관
          <p className={styles.HistoryListElement}>
            택시 공유 서비스 <Span>아이택시</Span> 웹 서비스 출시
          </p>
          <p className={styles.HistoryListElement}>
            강의 평가 시스템 <Span>SEAL</Span> 웹 서비스 출시
          </p>
          <p className={styles.HistoryListElement}>
            전공체험활동 프로그램, 전산전자공학부 진행
          </p>
        </Li>

        <Li>
          2017 동계 C 캠프
          <Span>&quot;Why so &lsquo;C&rsquo;rious?&quot;</Span> 주관
          <p className={styles.HistoryListElement}>
            기프티콘 서비스 <Span>i-gift</Span> 웹 서비스 출시
          </p>
          <p className={styles.HistoryListElement}>
            전공체험활동 프로그램, 전산전자공학부 진행
          </p>
        </Li>

        <Li>
          2018 동계 C 캠프 <Span>&lsquo;나우 유 C 미&rsquo;</Span> 주관
          <p className={styles.HistoryListElement}>
            <Span>&apos;CAKE - C언어 웹 에디터&apos;</Span> 경북대학교
            SW전공동아리 전시회 우수상 수상
          </p>
          <p className={styles.HistoryListElement}>
            강의 평가 서비스 <Span>SEAL</Span> 모바일 웹 리뉴얼
          </p>
          <p className={styles.HistoryListElement}>
            <Span>아이헝그리</Span> iOS/Android 어플 출시
          </p>
          <p className={styles.HistoryListElement}>
            택시 공유 서비스 <Span>아이택시</Span> iOS/Android 어플 출시
          </p>
          <p className={styles.HistoryListElement}>
            전공체험활동 프로그램, 전산전자공학부 진행
          </p>
        </Li>

        <Li>
          2019 동계 C 캠프 <Span>&lsquo;하늘과 바람과 별과 C&rsquo;</Span> 주관
          <p className={styles.HistoryListElement}>
            인트라넷 <Span>i7</Span> 개발 리뉴얼
          </p>
          <p className={styles.HistoryListElement}>
            수강신청 도우미 <Span>histime</Span> 웹 서비스 베타 출시
          </p>
        </Li>

        <Li>
          2020 동계 C 캠프 <Span>&lsquo;선배들과 함께하는 C 캠프&rsquo;</Span>{' '}
          주관
          <p className={styles.HistoryListElement}>
            중고 거래 서비스 <Span>H-Safari</Span> iOS/Android 어플 출시
          </p>
        </Li>

        <Li>
          2021 동계 C 캠프
          <Span> &rsquo;선배들과 함께하는 C 캠프&rsquo;</Span> 주관
          <p className={styles.HistoryListElement}>
            수강신청 도우미 <Span>대학시간</Span> 웹 서비스 출시
          </p>
          <p className={styles.HistoryListElement}>
            교내 분실물 찾기 서비스 <Span>HisFinder</Span>
          </p>
          <p className={styles.HistoryListElement}>동계 신입 프로젝트</p>
          <p className={styles.HistoryListElement}>
            주식 추천 애플리케이션 <Span>StocKid</Span>
          </p>
          <p className={styles.HistoryListElement}>
            찬양팀 보조 애플리케이션 <Span>Haring</Span>
          </p>
          <p className={styles.HistoryListElement}>
            대안학교 플랫폼 <Span>HILS</Span>
          </p>
          <p className={styles.HistoryListElement}>
            스터디 매칭 플랫폼 <Span>Smapp</Span>
          </p>
          <p className={styles.HistoryListElement}>
            딥러닝 스터디 <Span>CIFAR Image Classifier</Span>
          </p>
        </Li>

        <Li>
          2022 동계 DS 캠프
          <Span> &rsquo;선배들과 함께하는 DS 캠프&rsquo;</Span> 주관
          <p className={styles.HistoryListElement}>하계 신입 프로젝트</p>
          <p className={styles.HistoryListElement}>
            한동인을 위한 런닝 애플리케이션 <Span>HRC</Span>
          </p>
          <p className={styles.HistoryListElement}>
            <Span>중력렌즈효과 판별 서비스</Span>
          </p>
          <p className={styles.HistoryListElement}>
            AR 얼굴인식 미니게임 <Span>ARMIGO~!</Span>
          </p>
          <p className={styles.HistoryListElement}>동계 신입 프로젝트</p>
          <p className={styles.HistoryListElement}>
            한동인을 위한 배달음식 공동구매 애플리케이션 <Span>한밥</Span>
          </p>
        </Li>

        <Li>
          2023 동계 DS 캠프
          <Span> &rsquo;선배들과 함께하는 DS 캠프&rsquo;</Span> 주관
          <p className={styles.HistoryListElement}>
            택시 공유 서비스 <Span>아이택시</Span> 리뉴얼
          </p>
          <p className={styles.HistoryListElement}>하계 신입 프로젝트</p>
          <p className={styles.HistoryListElement}>
            온라인 이미지 스테이션 서비스 <Span>이미지 스테이션</Span>
          </p>
          <p className={styles.HistoryListElement}>
            동아리 공연 예매 서비스 <Span>동공확장</Span>
          </p>
          <p className={styles.HistoryListElement}>
            카드 사용 가맹점 지도 애플리케이션 <Span>카드MAP</Span>
          </p>
          <p className={styles.HistoryListElement}>동계 신입 프로젝트</p>
          <p className={styles.HistoryListElement}>
            대학생 조별 과제 관리 애플리케이션 <Span>Team Check Mate</Span>
          </p>
          <p className={styles.HistoryListElement}>
            뱀파이어 세계의 인간 가문 운영 게임 <Span>BloodStore</Span>
          </p>
          <p className={styles.HistoryListElement}>
            CRA 동아리 애플리케이션 <Span>CRA</Span>
          </p>
        </Li>

        <Li>
          2024 동계 DS 캠프
          <Span> &rsquo;선배들과 함께하는 DS 캠프&rsquo;</Span> 주관
          <p className={styles.HistoryListElement}>하계 신입 프로젝트</p>
          <p className={styles.HistoryListElement}>
            발전기 고장 해결 퍼즐 어드벤처 게임 <Span>Lazy Raccoon</Span>
          </p>
          <p className={styles.HistoryListElement}>
            동아리 공연 예매 서비스 <Span>동공확장 2</Span>
          </p>
          <p className={styles.HistoryListElement}>동계 신입 프로젝트</p>
          <p className={styles.HistoryListElement}>
            실시간 전략 게임 <Span>말랑 타격대</Span>
          </p>
          <p className={styles.HistoryListElement}>
            CRA 동아리 홈페이지 <Span>CRA 웹</Span>
          </p>
          <p className={styles.HistoryListElement}>
            AI 기반 코딩 도우미 <Span>Coding Roadmap Assistant</Span>
          </p>
        </Li>

        <Li>
          2025 동계 DS 캠프
          <Span> &rsquo;선배들과 함께하는 DS 캠프&rsquo;</Span> 주관
        </Li>

        <Li className={styles.HistoryLastElement}>
          <p>
            그 외 지속적으로 다수의 기술 세미나 주최 (인공지능, 웹개발, Git
            노하우 등)
          </p>
        </Li>
      </ul>
    </div>
  );
}

export default IntroHistory;
