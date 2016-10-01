/*
 * @Name         Kerrigan
 * @Author:      Quanta
 * @NPC:         9901008
 * @Purpose:     Recruits player to join the Zerg Swarm.
 */

function start() { 
    cm.sendYesNo("This is your #rQueen#k speaking! #b \r Call me #rKerrigan#b, I am the Queen of the Zerg Swarm. Both of our worlds are in grave #rdanger#b, I will assist you with the help of the swarm in order for you to become stronger.#g\r There are many benefits if you join us. For more information, use the command #r@zerg#g to find out.#k\r Would you like to join the #rSwarm#b?");
} 
function action(m, t, s) {
    if (m > 0 && cm.getPlayer().getGuildId() == 0) {
        cm.getPlayer().setGuildId(2);
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