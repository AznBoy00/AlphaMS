/*
 * @Name         Artanis
 * @Author:      Quanta
 * @NPC:         9901009
 * @Purpose:     Recruits player to join the Protoss.
 */

function start() { 
    cm.sendYesNo("Greetings warrior! \r #bCall me #rArtanis#b, I am the leader of the almighty #rProtoss#b race. Both of our worlds are in grave #rdanger#b, I will provide you the technology you need to make yourself a stronger warrior.#g\r There are many benefits if you join us. For more information, use the command #r@protoss#g to find out.#k\r Would you like to join us and fight for #rAiur#b?");
} 
function action(m, t, s) {
    if (m > 0 && cm.getPlayer().getGuildId() == 0) {
        cm.getPlayer().setGuildId(3);
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