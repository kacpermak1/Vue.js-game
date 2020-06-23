new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameStarted: false,
        specialAttackActive:true,
        healActive:true,
        healButtonDisabled: true,
        infoArray:[],
        counter: 10
    },
    methods:{
        startGame: function(){
            this.gameStarted = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.specialAttackActive = true,
            this.healActive = true,
            this.infoArray=[]
        },

        attack: function(){
            const val1 = Math.floor(Math.random() * (5 - 1) + 1);
            const val2 = Math.floor(Math.random() * (5 - 1) + 1);
            this.playerHealth = this.playerHealth - val1;
            this.monsterHealth = this.monsterHealth - val2;
            const attackObj = {
                playerDamage: "Monster hits player for: " + val1,
                monsterDamage: "Player hits monster for: " + val2
            }
            this.infoArray.unshift(attackObj);
        },

        specialAttack: function(){
            const val1 = Math.floor(Math.random() * (5 - 1) + 1);
            const val2 = Math.floor(Math.random() * (10 - 5) + 5);
            if(this.specialAttackActive){
            this.playerHealth = this.playerHealth - val1;
            this.monsterHealth = this.monsterHealth - val2;

            const attackObj = {
                playerDamage: "Monster hits player for: " + val1,
                monsterDamage: "Player hits monster for: " + val2
            }

            this.infoArray.unshift(attackObj);

            this.specialAttackActive = false;}
        },

        heal: function(){
            if(this.healActive && this.playerHealth <= 50){

            const monsterHealValue = Math.floor(Math.random() * (10 - 1) + 1);
            this.playerHealth = this.playerHealth + 10;
            this.monsterHealth = this.monsterHealth + monsterHealValue;

            const attackObj = {
                playerDamage: "Monster heals himself for: " + monsterHealValue,
                monsterDamage: "Player heals himself for: 10"
            }

            this.infoArray.unshift(attackObj);

            this.healActive = false;
            }
        },

        giveUp: function(){
            this.gameStarted = false;
        }
    },

    watch:{
        gameStarted: function(){
            let myInterval;
            if(this.gameStarted){
                this.counter = 10;
                myInterval = setInterval(()=>{
                    this.counter -= 1;

                    if(this.counter <= 0 || !this.gameStarted){
                        clearInterval(myInterval);
                    }

                },1000);
        }       
        },

        specialAttackActive: function(e){
            setTimeout(()=>{
                this.specialAttackActive = true;
            },10000)
        },

        healActive: function(e){
            setTimeout(()=>{
                this.healActive = true;
                if(this.playerHealth <= 50){
                this.healButtonDisabled = false;}
            },8000)
        },

        playerHealth: function(){
            if((this.playerHealth > 50) || (this.playerHealth <= 50 && !this.healActive)){
                this.healButtonDisabled = true;
            }else{
                this.healButtonDisabled = false;
            }

            if(this.playerHealth <= 0 && this.monsterHealth > 0 || this.counter <= 0){
                alert('You lost!');
                this.gameStarted = false;
            }else if(this.playerHealth > 0 && this.monsterHealth <= 0 && this.counter > 0){
                alert('You won!');
                this.gameStarted = false;
            }else if(this.playerHealth == 0 && this.monsterHealth == 0 && this.counter > 0){
                alert('Draw!');
                this.gameStarted = false;
            }
        },

        counter: function(){
            if(this.counter <= 0){
                alert('Time is up... You lost!');
                this.gameStarted = false;
            }
        }
    }
});