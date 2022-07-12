const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage: (menu) => {
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage: () => {
    return JSON.parse(localStorage.getItem('menu'));
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = 'espresso';
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    console.log(this);
    render();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
      })
      .join('');
    $('#menu-list').innerHTML = template;
    // 입력된 메뉴 총 갯수
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = $('#menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    const MenuName = $('#menu-name').value;
    this.menu[this.currentCategory].push({ name: MenuName });
    store.setLocalStorage(this.menu);
    render();
    $('#menu-name').value = '';
  };

  const updatedMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt(
      '메뉴 이름을 수정해주세요.',
      $menuName.innerText
    );
    if (updatedMenuName === '') {
      alert('메뉴 이름을 입력해주세요.');
      return;
    }
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm('정말 메뉴를 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      e.target.closest('li').remove();
      store.setLocalStorage(this.menu);
      updateMenuCount();
    }
  };

  // Form 태그가 자동으로 전송되는 것을 막아줌
  $('#menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // 메뉴의 입력 받기
  $('#menu-submit-button').addEventListener('click', () => {
    if ($('#menu-name').value === '') {
      alert('값을 입력해주세요.');
      return;
    }
    addMenuName();
  });

  $('#menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if ($('#menu-name').value === '') {
      alert('값을 입력해주세요.');
      return;
    }
    if (e.key === 'Enter') {
      addMenuName();
    }
  });

  $('nav').addEventListener('click', (e) => {
    const isCategoryButton = e.target.classList.contains('cafe-category-name');
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $('#category-title').innerHTML = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  });

  // 메뉴 수정
  $('#menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updatedMenuName(e);
    }
  });

  // 메뉴 삭제
  $('#menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });
}

const app = new App();
app.init();
