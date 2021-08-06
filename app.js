// made by Aaron Starr
// js is a headache with variable typing it seems

'use strict';

// global var for player data
const playerData = {
    name:"",
    health:0,
    gold:0,
    level:0,
    xp:0,
    weapon:"",
    armor:"",
    inventory:{},
    skills:{},
    totalKills:0
};

// global var for game data
const gameData = {
    currentLocation:"",
    townStage:0,
    dungeonStage:0
};

/* center page obj constuctor */
function CenterPageObj(title="") 
{
    const obj = {};

    obj.titleName = 'centerPageTitle';
    obj.title = title;
    //obj.titleBar = 'centerPageBar'
    obj.playerNameId = 'sidenavCharacterName'

    obj.mainMenuName = 'mainMenu';
    obj.mapPageName = 'mapPage';
    obj.characterPageName = 'characterPage';
    obj.inventoryPageName = 'inventoryPage';
    obj.skillPageName = 'skillPage';
    obj.storePageName = 'storePage';
    obj.creditsPageName = 'creditsPage';

    obj.sidenavMapName = 'sidenavMapRow';
    obj.sidenavCreditsName = 'sidenavCreditsRow';
    obj.sidenavCharacterName = 'sidenavCharacterRow';
    obj.sidenavInventoryName = 'sidenavInventoryRow';
    obj.sidenavSkillName = 'sidenavSkillRow';
    obj.sidenavStoreName = 'sidenavStoreRow';
    obj.sidenavSaveName = 'sidenavSaveRow';
    obj.sidenavLoadName = 'sidenavLoadRow';

    return obj;
}

function sidenavRowClick(rowNum) 
{

    let centerPage = new CenterPageObj();

    // centerPageTitle
    centerPage.title = document.getElementById(centerPage.titleName);

    switch(rowNum)
    {
        case 0: // Character
            loadMapSheet(centerPage);
            break;

        case 1: // Character
            loadCharacterSheet(centerPage);
            break;
        
        case 2: // Inventory
            loadInventorySheet(centerPage);
            break;
            
        case 3: // Skills
            loadSkillsSheet(centerPage);
            break;
            
        case 4: // Store
            loadStoreSheet(centerPage);
            break;

        case 5: // Save
            loadSave(centerPage);
            break;

        case 6: // Load
            loadLoad(centerPage);
            break;

        case 7: // Credits
            loadCreditsSheet(centerPage);
            break;
    }
}

// hide all center page setups
function setAllCenterPagesToHidden(centerPage)
{
    document.getElementById(centerPage.mainMenuName).hidden = true;
    document.getElementById(centerPage.mapPageName).hidden = true;
    document.getElementById(centerPage.characterPageName).hidden = true;
    document.getElementById(centerPage.inventoryPageName).hidden = true;
    document.getElementById(centerPage.skillPageName).hidden = true;
    document.getElementById(centerPage.storePageName).hidden = true;
    document.getElementById(centerPage.creditsPageName).hidden = true;
}

// Hide most sidenav buttons (exclusions apply; such as Save, Load, Credits)
function setMostSideNavToHidden(centerPage)
{
    document.getElementById(centerPage.sidenavMapName).hidden = true;
    document.getElementById(centerPage.sidenavCharacterName).hidden = true;
    document.getElementById(centerPage.sidenavInventoryName).hidden = true;
    document.getElementById(centerPage.sidenavSkillName).hidden = true;
    document.getElementById(centerPage.sidenavStoreName).hidden = true;
    document.getElementById(centerPage.sidenavCreditsName).hidden = true;
}

// Show most sidenav buttons (exclusions apply; such as Save, Load and Credits which are always visible)
function setMostSideNavToVisible(centerPage)
{
    document.getElementById(centerPage.sidenavMapName).hidden = false;
    document.getElementById(centerPage.sidenavCharacterName).hidden = false;
    document.getElementById(centerPage.sidenavInventoryName).hidden = false;
    document.getElementById(centerPage.sidenavSkillName).hidden = false;
    document.getElementById(centerPage.sidenavStoreName).hidden = false;
    document.getElementById(centerPage.sidenavSaveName).hidden = false;
    document.getElementById(centerPage.sidenavCreditsName).hidden = false;
}

// load the center page with the store html
function loadMapSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Map";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.mapPageName).hidden = false;
}

// expose the center page with the character html
function loadCharacterSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Character";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.characterPageName).hidden = false;
}

// load the center page with the inventory html
function loadInventorySheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Inventory";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.inventoryPageName).hidden = false;
}

// load the center page with the skills html
function loadSkillsSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Skills";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.skillPageName).hidden = false;
}

// load the center page with the store html
function loadStoreSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Store";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.storePageName).hidden = false;
}

// load, save system
function loadSave(centerPage)
{
    setMostSideNavToHidden(centerPage);
}

// load, load file system
function loadLoad(centerPage)
{
    setMostSideNavToVisible(centerPage);
}

// load the center page with the credits html
function loadCreditsSheet(centerPage)
{
    document.getElementById(centerPage.titleName).innerHTML = "Credits";

    setAllCenterPagesToHidden(centerPage);
    document.getElementById(centerPage.creditsPageName).hidden = false;
}

function setName(centerPage,name)
{
    // update view
    document.getElementById(centerPage.playerNameId).innerHTML = name;

    // update data
    playerData.name = name;
}


function setHealth(centerPage,newHealth)
{
    // player death
    if(newHealth <= 0)
    {
        // update view
        document.getElementById("sidenavHealth").innerHTML = "0 HP";

        // update data
        playerData.health = 0;
    }
    else
    {
        // update view
        document.getElementById("sidenavHealth").innerHTML = newHealth + " HP";

        // update data
        playerData.health = newHealth;
    }
}

function setGold(centerPage,newGold)
{
    // update view
    document.getElementById("sidenavGold").innerHTML = newGold + " GP";

    // update data
    playerData.gold = newGold;
}

// best case would be to actually create some weapon objects, but that aint this.
// Rusty Sword - +0 Damage
// Iron Sword - +3 Damage
// Steel Sword - +6 Damage
// Sharp Steel Sword - +9 Damage
// Imbued Sword - +12 Damage
// King's Sword - +15 Damage
function setWeapon(centerPage,weapon)
{
    // update view

    // update data
    playerData.weapon = weapon;
}

// best case would be to actually create some armor objects, but that aint this.
// Tattered Cloth - 0 Armor
// Cloth - 1 Armor
// Leather - 2 Armor
// Breast Plate - 3 Armor
// Full Plate - 4 Armor
// King's Plate - 5 Armor
function setArmor(centerPage,armor)
{
    // update view

    // update data
    playerData.armor = armor;
}

function addToInventory(centerPage,item)
{
    // update view

    // update data
    if(playerData.inventory[item])
    {
        playerData.inventory[item] = playerData.inventory[item] + 1;
    }
    else
    {
        playerData.inventory[item] = 1;
    }
}

// start menu start button pressed
// if the user doesnt follow the 1 requirement of no commas we give them the name IdiotWithNoName (also if they dont type anything)
function startButtonPressed()
{
    let centerPage = new CenterPageObj();

    // centerPageTitle
    centerPage.title = document.getElementById(centerPage.titleName);

    var userInputName = document.getElementById('startMainMenuName').value;
    if(userInputName && !userInputName.includes(','))
    {
        var playerName = document.getElementById('startMainMenuName').value;
        setName(centerPage,playerName)
    }
    else
    {
        var playerName = "IdiotWithNoName"
        setName(centerPage,playerName)
    }

    setHealth(centerPage,100);
    setGold(centerPage,50);
    setWeapon(centerPage,"Rusty Sword");
    setArmor(centerPage,"Tattered Cloth");
    console.log(playerData.inventory);
    addToInventory(centerPage,"Health Potion");
    addToInventory(centerPage,"Health Potion");
    addToInventory(centerPage,"Inactive Bomb");
    console.log(playerData.inventory);
    playerData.skills = {"Rend":1};
    playerData.totalKills = 0;
    playerData.currentLocation = "Roc Town";
    playerData.townStage = 0;
    playerData.dungeonStage = 0;

    setMostSideNavToVisible(centerPage);

    loadMapSheet(centerPage);
}