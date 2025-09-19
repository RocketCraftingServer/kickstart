
export let Avatar = (arg) => {
  // alert(arg.res[arg.key][arg.key1])
  let src = arg.res[arg.key][arg.key1].replace('public', '');
  // arg.res[arg.key][arg.key1].replace('public', '');
  return `
  <img class="avatarProfile" alt="${arg.key1}" src="${arg.apiDomain}:2020/${src}"/>
`};
