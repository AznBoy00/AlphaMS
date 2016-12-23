/* global em, java, Packages */

// @Author Groat
// Boss Quest 

importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server);
importPackage(Packages.tools);

var lose = true;
var exitMap;
var instanceId;
var questMap = 240060200;
var monster = new Array(
	3220000, // Stumpy,
	9300003, // Slime King
	9300012, // Alishar
	8220001, // Yeti on Skis
	8220000, // Elliza
	9300119, // Lord Pirate
	9300152, // Angry Franken Lloyd
	9300039, // Papa Pixie
	9300032, // Knight Statue B
	9300028, // Ergoth
	9400549, // Headless Horseman
	8180001, // Griffey
	8180000, // Manon
	8500001, // Papulatus
	9400575, // Big Foot
	9400014, // Black Crow
	8800002, // Zakum Body 3
	9400121, // Female Boss
	9400300 // The Boss
);


function init() {
}

function monsterValue(eim, mobId) {
	return 1;
}

function setup(partyid) {
	exitMap = em.getChannelServer().getMapFactory().getMap(100000000);
	var instanceName = "BossQuest" + partyid;

	var eim = em.newInstance(instanceName);
	var mf = eim.getMapFactory();
	var map = mf.getMap(questMap, false, true, false);
        map.toggleDrops();

	eim.setProperty("points", 0);
	eim.setProperty("monster_number", 0);

	eim.schedule("beginQuest", 5000);
	return eim;
}

function playerEntry(eim, player) {
	var map = eim.getMapInstance(questMap);
	player.changeMap(map, map.getPortal(0));
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) { 
	player.setHp(player.getMaxHp());
	playerExit(eim, player);
	return false;
}

function playerDisconnected(eim, player) {
	eim.removePlayer(eim, player);
}

function leftParty(eim, player) {			
	playerExit(eim, player);
}

function disbandParty(eim) {
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
}

function dispose() {
}

function playerExit(eim, player) {
	var party = eim.getPlayers();
	var dispose = false;
	if (party.size() == 1) {
		dispose = true;
	}
	eim.saveBossQuestPoints(parseInt(eim.getProperty("points")), player);
        
        //player.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6, "CODE REACHED HERE."));
        
        if (lose)
            player.getClient().getSession().write(Packages.tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] Your current points have been awarded, spend them as you wish. Better luck next time!"));
	eim.unregisterPlayer(player);
	player.changeMap(exitMap, exitMap.getPortal(2));
	if (dispose) {
            eim.dispose();
	}
}

function removePlayer(eim, player) {
	var party = eim.getPlayers();
	var dispose = false;
	if (party.size() === 1) {
		dispose = true;
	}
	eim.saveBossQuestPoints(parseInt(eim.getProperty("points")), player);
	eim.unregisterPlayer(player);
	player.getMap().removePlayer(player);
	player.setMap(exitMap);
	if (dispose) {
		eim.dispose();
	}
}

function clearPQ(eim) {
	var party = eim.getPlayers();
	for (var i = 0; i < party.size(); i++) {
		playerExit(eim, party.get(i));
	}
}

function allMonstersDead(eim) {
	var monster_number = parseInt(eim.getProperty("monster_number"));
	var points = parseInt(eim.getProperty("points"));
	
	var monster_end = java.lang.System.currentTimeMillis();
	var monster_time = Math.round((monster_end - parseInt(eim.getProperty("monster_start"))) / 1000);
	
	if (1200 - monster_time <= 0) points += monster_number * 10000;
	else points += (monster_number * 10000) + ((1200 - monster_time) * (monster_number + 1));
	
        
        monster_number++;
	
	eim.setProperty("points", points);
	eim.setProperty("monster_number", monster_number);
	
	var map = eim.getMapInstance(questMap);

	if (monster_number >= monster.length) {
		//var party = eim.getPlayers();
		// for (var i = 0; i < party.size(); i++) {
		     //party.get(i).finishAchievement(2);
                eim.giveBossQuestReward(); // Reward
                points += 10000000;
                lose = false;
		// }
		map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] Congratulations! Your team has defeated all the bosses with " + points + " points!"));
		map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] The points have been awarded, spend them as you wish."));
                eim.saveAllBossQuestPoints(parseInt(eim.getProperty("points")));
                clearPQ(eim);
	} else {
		map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] Your team now has " + points + " points! The next boss will spawn in 10 seconds."));
		map.broadcastMessage(Packages.tools.MaplePacketCreator.getClock(10));
		eim.schedule("monsterSpawn", 10000);
	}
}

function monsterSpawn(eim) {
        var mob = em.getMonster(monster[parseInt(eim.getProperty("monster_number"))]);
        var overrideStats = new Packages.server.life.MapleMonsterStats();

        if (mob != null) {
            if (parseInt(eim.getProperty("monster_number")) > (monster.length/2)) overrideStats.setHp(mob.getHp());
            else overrideStats.setHp(mob.getHp() * 2);

            overrideStats.setExp(mob.getExp() * 2);
            overrideStats.setMp(mob.getMaxMp());
            mob.setOverrideStats(overrideStats);

            if (parseInt(eim.getProperty("monster_number")) > (monster.length/2)) mob.setHp(mob.getHp());
            else mob.setHp(mob.getHp() * 2);

            eim.registerMonster(mob);

            var map = eim.getMapInstance(questMap);
            map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(100, 100));
            eim.setProperty("monster_start", java.lang.System.currentTimeMillis());
        }
}

function beginQuest(eim) {
	var map = eim.getMapInstance(questMap);
        map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(6, "[The Boss Quest] The creatures of the darkness are coming in 30 seconds. Prepare for the worst!"));
	eim.schedule("monsterSpawn", 30000);
	map.broadcastMessage(Packages.tools.MaplePacketCreator.getClock(30));
}

function cancelSchedule() {
}