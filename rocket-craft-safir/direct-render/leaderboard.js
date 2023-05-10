
export let LeaderBoardRender = (arg) => `
  <div class="horCenter h5">
    ${arg.map((item) =>
      `<div class="">${item.key} : ${item.value}</div>`).join('')
    }
  </div>
`;
