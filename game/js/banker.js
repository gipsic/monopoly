const updatePlayers = (roomInfo) => {
  let html = '';
  if(typeof roomInfo.user === "object") {
    roomInfo.user.forEach(u => {
      console.log(u);
      html += `<div class="player-item flex mb-2 p-2 gap-2 items-center rounded-md  bg-white/60 w-full">
      <div class="w-12 h-12 rounded-full orca bg-gray-300"></div>
      <div class="flex-auto">  
        <div class="id text-sm">ID: ${u.id}</div>
        <div class="name text-lg">${u.nickName}'s Orca</div>
      </div>
      <div class="w-24 text-center">
        <div class="text-green-500 font-bold">Ready</div>
      </div>
    </div>`;
    })
  }
  $("#player-list")[0].innerHTML = html;
}