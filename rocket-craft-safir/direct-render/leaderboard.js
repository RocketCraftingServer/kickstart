
export let LeaderBoardRender = (arg, colorFlag) => `
  <div class="horCenter h5 myMarginList" 
       style="background-color:${(colorFlag == true ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)' )}">
    ${arg.map((item, index) =>
      `<div onclick=" navigator.clipboard.writeText(this.innerHTML);"
         class="${(index % 2 == 0 ? 'tableStyleMark0' : 'tableStyleMark1' )}">
           ${item.key} : ${item.value}
          </div>`).join('')
    }
  </div>
`;
