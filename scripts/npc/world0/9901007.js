/*
 * @Name         JimRaynor
 * @Author:      Quanta
 * @NPC:         9901007
 * @Purpose:     Recruits player to join the Terrans.
 */

function start() { 
    cm.sendYesNo("Hey soldier, this is#r Jimmy#b,\r Call me #rJim Raynor#b, I fought many wars with other extraterrestrial races such as the #rProtoss#b and the #rZergs#b. Both of our worlds are in grave #rdanger#b, I will make sure that you will be trained properly in order to save both worlds.#g\r There are many benefits if you join us. For more information, use the command #r@terran#g to find out.#k\r Would you like to join #rThe Terran Faction#b?");
} 
function action(m, t, s) {
    if (m > 0 && cm.getPlayer().getGuildId() == 0) {
        cm.getPlayer().setGuildId(1);
		cm.getPlayer().dropMessage("Please re-log or change channel in order to see your guild.");
		cm.dispose();
	} else if (cm.getPlayer().getGuildId() > 0){
		cm.sendOk("Please leave your current guild before joining ours.");
		cm.dispose();
	} else {
		cm.sendOk("Choose wisely, don't take too much time or it will be too late.");
		cm.dispose();
	}
}