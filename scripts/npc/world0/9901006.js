/*
 * @Name         [Admin]Quanta
 * @Author:      Quanta
 * @NPC:         9901006
 * @Purpose:     Warps to GMMap - SC System NPC 01
 */

importPackage(Packages.tools);

var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0)
            cm.dispose();
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#dHey there! \r #b \r It's #r[Admin]Quanta#b again! Something weird is happening to #rArchonMS#b. Space and time are being disrupted, our world is heading into a crash collision towards another#r unknown world#b. Some people from the#r unknown world#b came to #rArchonMS#b in order to recruit our strongest warriors in order to save both worlds. #b\r\n#L0#What is this all about?\r\n#L1#Take me to where they are, I want to help them!\r\n#L2#Let me think a bit.");
        } else if (status == 1) {
            if (selection == 0) {
                    cm.sendOk("#bApparently many dangerous creatures in this world, such as#r Zakum, Horntail & PinkBean#b, gathered their energies in order to warp an entire world to crash with ours. Some heroes from the other came here to ask for help and I can warp you there.");
                    cm.dispose();
            } else if (selection == 1) {
                cm.warp(180000000);
                cm.dispose();
            } else if (selection == 2) {
                cm.sendOk("Let me know when you will be ready! Make your decision quickly, we need to gather as many warriors as we can!");
                cm.dispose();
            }
        } else {
                cm.sendOk("Let me know when you will be ready! Make your decision quickly, we need to gather as many warriors as we can!");
                status--;
                cm.dispose();
            }
        }
    }