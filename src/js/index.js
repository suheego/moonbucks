const $ = (selector) => document.querySelector(selector);

function App() {
  // Form 태그가 자동으로 전송되는 것을 막아줌
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  } 

  const addMenuName = () => {
    const espressoMenuName = $('#espresso-menu-name').value;
    const menuItemTemplate = (espressoMenuName) => {
      return `
      <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
      <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
          수정
      </button>
      <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
          삭제  
      </button>
      </li>
      `;
    };
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(espressoMenuName)
    );

    // 입력된 메뉴 총 갯수
    updateMenuCount();
    $('#espresso-menu-name').value = '';
  };

  const updatedMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name') 
    const updatedMenuName = prompt('메뉴 이름을 수정해주세요.', $menuName.innerText)

    if (updatedMenuName === '') {
      alert('값을 입력해주세요.');
      return;
    }

    $menuName.innerText = updatedMenuName;
  }

  // 메뉴의 입력 받기
  $('#espresso-menu-submit-button').addEventListener('click', () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요.');
      return;
    }
    
    addMenuName();
  });

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요.');
      return;
    }
    if (e.key === 'Enter') {
      addMenuName();
    }
  });

  // 메뉴 수정
  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updatedMenuName(e);
    }
  });

  // 메뉴 삭제
  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm('정말 메뉴를 삭제하시겠습니까?')) {
        e.target.closest('li').remove();
        updateMenuCount();
      }
    }
  });

}

App();
