(() => {
  const buildAlertOverlay = () => {
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay in-page';
    overlay.hidden = true;

    overlay.innerHTML = `
      <div class="alert-modal" role="dialog" aria-modal="true" aria-label="알림 내역">
        <button class="alert-close" type="button" aria-label="닫기">
          <img src="./assets/icon/x%20button.svg" alt="" aria-hidden="true" />
        </button>

        <div class="alert-list">
          <div class="alert-row alert-danger">
            <div class="left">
              <div class="icon danger-icon"><img class="icon-img" src="./assets/icon/alert_icon1.svg" alt="위험 아이콘"></div>
            </div>
            <div class="center">
              <div class="title"><strong>비상! 수온이 <span class="em">28.5°C▲</span>까지 상승했습니다.</strong></div>
              <div class="desc">냉각 시스템을 점검하세요!</div>
            </div>
            <div class="right">
              <div class="time">12:45</div>
              <div class="status">읽음</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="alert-row alert-info">
            <div class="left">
              <div class="icon blue-icon"><img class="icon-img" src="./assets/icon/alert_icon2.svg" alt="용존산소 아이콘"></div>
            </div>
            <div class="center">
              <div class="title"><strong>용존산소량이 <span class="info-em">4.5 mg/L 이하▼</span>로 떨어졌습니다.</strong></div>
              <div class="desc">에어레이터를 즉시 가동하세요!</div>
            </div>
            <div class="right">
              <div class="time">11:00</div>
              <div class="status">읽음</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="alert-row alert-info">
            <div class="left">
              <div class="icon blue-icon"><img class="icon-img" src="./assets/icon/alert_icon3.svg" alt="수질 아이콘"></div>
            </div>
            <div class="center">
              <div class="title"><strong>수질 산도가 <span class="info-em">5.5▼</span>로 낮아졌습니다.</strong></div>
              <div class="desc">중화 조치를 고려하세요.</div>
            </div>
            <div class="right">
              <div class="time">10:45</div>
              <div class="status">읽음</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="alert-row alert-danger">
            <div class="left">
              <div class="icon danger-icon"><img class="icon-img" src="./assets/icon/alert_icon4.svg" alt="암모니아 아이콘"></div>
            </div>
            <div class="center">
              <div class="title"><strong>암모니아 농도가 <span class="em">0.5ppm▲</span>을 초과했습니다.</strong></div>
              <div class="desc">사료 공급을 일시 중단하고 물을 교체하세요.</div>
            </div>
            <div class="right">
              <div class="time">10:05</div>
              <div class="status">읽음</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="alert-row alert-danger">
            <div class="left">
              <div class="icon danger-icon"><img class="icon-img" src="./assets/icon/alert_icon5.svg" alt="습도 아이콘"></div>
            </div>
            <div class="center">
              <div class="title"><strong>실내 습도가 <span class="em">90%▲</span>에 도달했습니다.</strong></div>
              <div class="desc">환풍기 가동을 권장합니다.</div>
            </div>
            <div class="right">
              <div class="time">09:30</div>
              <div class="status">읽음</div>
            </div>
          </div>
        </div>
      </div>
    `;

    return overlay;
  };

  const getModalHost = () => {
    const canvas = document.querySelector('.canvas');
    if (!canvas) return document.body;

    return (
      canvas.querySelector('.main-inner') ||
      canvas.querySelector('main') ||
      document.body
    );
  };

  const init = () => {
    const isFullscreen = document.body.classList.contains('alert-modal-fullscreen');
    const bellLinks = Array.from(document.querySelectorAll('a.bell-link'));
    const bellIcons = Array.from(document.querySelectorAll('.bell-icon'));

    if (!bellLinks.length && !bellIcons.length) return;

    const overlay = buildAlertOverlay();

    if (isFullscreen) {
      overlay.classList.add('is-fixed');
      document.body.appendChild(overlay);
    } else {
      const host = getModalHost();
      const isInCanvas = Boolean(host.closest?.('.canvas')) && host !== document.body;
      if (isInCanvas) {
        host.classList.add('alert-modal-host');
        overlay.classList.add('is-absolute');
        host.appendChild(overlay);
      } else {
        document.body.appendChild(overlay);
      }
    }

    const closeButton = overlay.querySelector('.alert-close');
    const close = () => {
      overlay.hidden = true;
    };

    closeButton?.addEventListener('click', close);

    const open = (event) => {
      event?.preventDefault?.();
      overlay.hidden = false;
    };

    const openFromIcon = (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      overlay.hidden = false;
    };

    bellLinks.forEach((link) => link.addEventListener('click', open));
    bellIcons.forEach((icon) => icon.addEventListener('click', openFromIcon));

  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
