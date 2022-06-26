const $ = (selector) => document.querySelector(selector);

function App() {
  // Form 태그가 자동으로 전송되는 것을 막아줌
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // 메뉴의 입력 받기
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      // 엔터를 누르면
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
    }
  });
}

App();
