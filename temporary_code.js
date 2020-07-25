// Прорвись с боем в святилище вождя огров и убей его.
function lowestHealthFriends() {
    var lowestHealth = 99999;
    var lowestFriend = null;
    var friends = hero.findFriends();
    for(var f= 0; f < friends.length; f++) {
        var friend = friends[f];
        if(friend.health < lowestHealth && friend.health < friend.maxHealth) {
            lowestHealth = friend.health;
            lowestFriend = friend;
        }
    }
    return lowestFriend;
}

function commandPaladin(friend) {
    // var enemy = friend.findNearestEnemy();
    var needHeal = lowestHealthFriends();
    
    if(hero.health < hero.maxHealth / 2 && friend.canCast("heal")) {
        hero.command(friend, "cast", "heal", hero);
    } else if(friend.health < friend.maxHealth) {
        hero.command(friend, "shield");
    } else {
        hero.command(friend, "move", hero.pos);
    } 
    
    // else {
    //     hero.command(friend, "move", {x: 117, y: 34});
    // }
}


function archerCommand(archer) {
    var fangrider = hero.findNearest(hero.findByType('fangrider'));
    var enemy = archer.findNearestEnemy();
    
    if(fangrider) {
        hero.command(archer, "attack", fangrider);
    } else if(enemy) {
        hero.command(archer, "attack", enemy);
    } else {
        hero.command(archer, "move", {x: 117, y: 34});
    }
}

function soldierCommand(soldier) {
    var enemies = soldier.findEnemies();
    var enemy = soldier.findNearest(enemies);
    if(enemy) {
        hero.command(soldier, "attack", enemy);
    } else {
        hero.command(soldier, "move", {x: 117, y: 34});
    }
}

function commandFriends() {
    var friends = hero.findFriends();
    for(var i = 0; i < friends.length; i++) {
        var friend = friends[i];
        if(friend.type === "paladin") {
            commandPaladin(friend);
        } else if(friend.type === "archer") {
            archerCommand(friend);
        } else if(friend.type === "soldier") {
            soldierCommand(friend);
        } 
    }
}

function earthSkin() {
    if(hero.canCast('earthskin')) {
        hero.cast("earthskin", hero);
    }
}

function attackTower() {
    while(true) {
        var tower = hero.findNearest(hero.findByType('tower'));
        var paladin = hero.findNearest(hero.findByType('paladin'));
        var enemy = hero.findNearestEnemy();
        if(tower) {
            while(tower.health > 0) {
                hero.attack(tower);
                commandFriends();
                earthSkin();
            }
        } else {
            hero.attack(enemy);
        }
    }
    
}

function commandHero() {
    while(true) {
        var flag = hero.findFlag("green");
        var cannon = hero.findNearest(hero.findByType('catapult'));
        var enemy = hero.findNearestEnemy();
        var tower = hero.findNearest(hero.findByType('tower'));
        
        if(flag) {
            hero.moveXY(flag.pos.x, flag.pos.y);
            hero.pickUpFlag(flag);
            commandFriends();
            if(cannon) {
                hero.attack(cannon);
            } else if(tower) {
                hero.attack(tower);
            } else if(enemy) {
                hero.attack(enemy);
            }
        }
    }
}

while(true) {
    var cannon = hero.findNearest(hero.findByType('catapult'));
    var enemy = hero.findNearestEnemy();
    var tower = hero.findNearest(hero.findByType('tower'));
    
    hero.summon("soldier");
    commandFriends();
    commandHero();
}
