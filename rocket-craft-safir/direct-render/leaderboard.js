
export let LeaderBoardRender = (arg, colorFlag) => `
  <div class="horCenter h5 myMarginList" 
       style="background-color:${(colorFlag == true ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)' )}">
    ${arg.map((item, index) =>

      `<div 
         style="background-color:${(index % 2 == 0 ? 'rgba(50,0,0,0.1)' : 'rgba(50,0,0,0.3)' )};
                color: white !important;">${item.key} : ${item.value}</div>`).join('')

    }
  </div>
`;
