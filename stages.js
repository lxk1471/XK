(() => {
const content=document.getElementById('stage-content');if(!content)return;
const stages=[
 {title:'記錄訪客看過哪些頁面',work:'串起進站、課程點擊與頁面瀏覽，還原選課順序。',metrics:[['1,000','進站人數'],['400','繼續瀏覽'],['40%','跨頁瀏覽比例']],rows:[['10:02','進入選課商店','/shop'],['10:03','查看課程 A','商品詳情'],['10:05','返回列表','繼續比較']],note:'1,000 位訪客中，400 位繼續查看其他頁面。'},
 {title:'記錄篩選條件與結果',work:'保留年級、地區與月份條件，對照篩選後有沒有繼續看課程。',metrics:[['240','使用篩選'],['180','點開課程'],['75%','篩選後點擊率']],rows:[['10:06','設定條件','小三 · 台北 · 7 月'],['10:06','顯示結果','找到 8 堂課'],['10:07','點開課程 B','從結果進入']],note:'240 位使用篩選的訪客中，180 位點開課程。'},
 {title:'確認商品成功加入購物車',work:'記錄加購成功事件，對照後續是否進入結帳。',metrics:[['60','成功加購'],['36','進入結帳'],['24','尚未進入結帳']],rows:[['10:08','加入課程 B','數量 1'],['10:08','加購成功','NT$3,200'],['10:09','前往結帳','購物車 → 結帳']],note:'60 位加購者中，36 位接著進入結帳。'},
 {title:'對照結帳與付款紀錄',work:'串起結帳與付款狀態，找出值得回頭檢查的流程。',metrics:[['36','進入結帳'],['24','完成付款'],['12','尚無付款紀錄']],rows:[['10:10','填寫訂購資料','訂單 DEMO-024'],['10:12','完成付款','NT$3,200'],['10:12','更新訂單','付款成功']],note:'36 位進入結帳的訪客中，24 位完成付款。'}
];
const tabs=[...document.querySelectorAll('[data-stage]')];
function select(i){tabs.forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1});document.getElementById('stage-panel').setAttribute('aria-labelledby',tabs[i].id);const s=stages[i];content.innerHTML=`<div class="stage-heading"><span class="stage-index">0${i+1}</span><span class="synthetic-badge">理解用範例，非實際數據</span></div><h3>${s.title}</h3><p class="stage-work">${s.work}</p><div class="stage-metrics">${s.metrics.map(([n,t])=>`<div><strong>${n}</strong><span>${t}</span></div>`).join('')}</div><div class="event-log"><div class="event-head"><span>時間</span><span>事件</span><span>紀錄</span></div>${s.rows.map(r=>`<div>${r.map(t=>`<span>${t}</span>`).join('')}</div>`).join('')}</div><p class="stage-readout">${s.note}</p>`;}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%4;else if(e.key==='ArrowLeft')n=(i+3)%4;else if(e.key==='Home')n=0;else if(e.key==='End')n=3;else return;e.preventDefault();select(n);tabs[n].focus()})});select(0);
})();
