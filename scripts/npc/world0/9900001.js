var status = -1;
var selected;
var idk;
var pe =Array("Dex", "Str", "Int", "Luk", "Wep Attack", "Mag Attack");
var d = false;
var equip;
var str;
var dex;
var iint;
var luk;
var wa;
var ma;
var a = false;
function start() {
	if (cm.getPlayer().gmLevel() < 1){
        cm.dispose();
        return;
    } else {
		cm.sendNext("Hey There! I can edit you Item Stats!");
	}
}
function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        if (mode == 1 && status != 3)
            status++;
        if (status == 0)
            cm.sendSimple("What item in your inventory would you like to edit?\r\n" + cm.EquipList(cm.getPlayer().getClient()));
        else if (status == 1) {        
            if (d == false) {
            equip = cm.getEquip(selection);
            dex = equip.getDex();
            str = equip.getStr();
            iint = equip.getInt();
            luk = equip.getLuk();
            wa = equip.getWatk();
            ma = equip.getMatk();
            selected = selection;
            d = true;
        }
            cm.sendSimple("What would you like to edit on your #b#t"+cm.getItemID(selected)+"#? #k:)" +
            "\r\n#L0##gSTR#k-#e("+str+")#l" +
            "\r\n#n#b#L1#DEX#k-#e("+dex+")#l" +
            "\r\n#n#r#L2#INT#k-#e("+iint+")#l" +
            "\r\n#n#d#L3#LUK#k-#e("+luk+")#l" +
            "\r\n#g#L4#WAtk#k-#e("+wa+")#l" +
            "\r\n#r#L5#MAtk#k-#e("+ma+")#l" +
            "\r\n\r\n#k#L6#Create item Now!#l");

        }
        else if (status == 2){
            if (selection == 6) {
                cm.gainEpicItem(selected, cm.getPlayer(), str, dex, iint, luk, wa, ma);
				cm.reloadChar();
                cm.sendOk("Done!");
                cm.dispose();
                return;
            }
                else {
                    if (a == false) {
                    idk = selection;
                    cm.sendGetText("What would you like to change your "+pe[selection]+" to?");
                    a = true;
                    } else
                        cm.sendGetText("What would you like to change your "+pe[idk]+" to?");
            
                }
            }else if (status == 3) {
            
                    var amount = parseInt(cm.getText());
                    if (amount < 0 || amount > 32767)
                        cm.sendOk("Please enter a number between 0 and 32767.");
                    else if (isNaN(amount))
                        cm.sendOk("Please enter a real number.");
                    else {
                        cm.sendOk("Done. Make any other changes you like :)");
                        switch(idk) {
                            case 0: str = amount; break;
                            case 1: dex = amount; break;
                            case 2: iint = amount; break;
                            case 3: luk = amount; break;
                            case 4: wa = amount; break;
                            case 5: ma = amount; break;  
                        }status--;
                        a = false;
                    }
                status--;
                status--;//Yeah I know I could've used status-=2.
                }
        }
    }  