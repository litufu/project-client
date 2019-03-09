import relationship  from './relationships'

export const familyGroups = [
    {id:1,name:'父母群'},
    {id:2,name:'祖父母群'},
    {id:3,name:'外祖父母群'},
    {id:4,name:'曾祖父母群'},
    {id:5,name:'曾外祖父母群'},
    {id:6,name:'我的群'},
]

const relationshipMap={
    'father':"爸爸",
    'mother':"妈妈",
    'youngbrother':"弟弟",
    'oldbrother':"哥哥",
    'youngsister':"妹妹",
    'oldsister':"姐姐",
    'wife':"老婆",
    'husband':"老公",
    'son':"儿子",
    'daughter':"女儿"
}

const sexMap = {
    'female':0,
    'male':1
}


const reverseRelationship=(rs,sex)=>{
    const text = `${relationshipMap[rs]}`
    const options = {
        text:text,	
        sex: sexMap[sex],			//自己的性别：0女性,1男性
        type:'default',		//转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
        reverse:true		//称呼方式：true对方称呼我,false我称呼对方
    };
    return relationship(options)
}


export const relationCompute=(families,id,creater)=>{
    // families:familyGroup中的families
    // id:user.id
    // 计算流程
    // （1）从family中找到自己
    // （2）遍历所有和自己相连的family，计算出他们的关系
    // （3）分别遍历已经计算出关系的families，计算与他们相连的关系
    // （4）如此往复直到没有了family
    let familyRelationships = {}
    let otherfamilies = []
    let userFamilies = {}
    let createrRelationship
    let me
    let count=0

    if(creater.id===id){
        me=creater
        createrRelationship = '我'
        for(const family of families){
          if(family.from.id===id){
                familyRelationships[family.id] = relationshipMap[family.relationship]
                if(family.to.user){
                    userFamilies[family.to.user.id] = relationshipMap[family.relationship]
                }
            }else{
                otherfamilies.push(family)
            }
        }
    }else {
        for(const family of families){
            if(family.to.user && family.to.user.id===id){
                familyRelationships[family.id] = '我'
                me=family.to.user
                const getRelationship = reverseRelationship(family.relationship,family.from.gender)
                if(family.from.id===creater.id && !createrRelationship ){
                    createrRelationship = getRelationship
                }
                userFamilies[family.from.id] = getRelationship
            }else if(family.from.id===id){
                me=family.from
                familyRelationships[family.id] = relationshipMap[family.relationship]
                if(family.to.user){
                    userFamilies[family.to.user.id] = relationshipMap[family.relationship]
                }
            }else{
                otherfamilies.push(family)
            }
        }

    }
    
    while(otherfamilies.length>0 && count<4){
        let tempfamilies = []
        for(const otherfamily of otherfamilies){
            if(otherfamily.from.id in userFamilies || ( otherfamily.to.user && otherfamily.to.user.id in userFamilies)){
                if(otherfamily.from.id in userFamilies ){
                    const options = {
                        text:`${userFamilies[otherfamily.from.id]}的${relationshipMap[otherfamily.relationship]}`,	
                        sex: sexMap[me.gender],			//自己的性别：0女性,1男性
                        type:'default',		//转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
                        reverse:false		//称呼方式：true对方称呼我,false我称呼对方
                    };
                    familyRelationships[otherfamily.id] = relationship(options)
                    if(otherfamily.from.id===creater.id && !createrRelationship) {
                        createrRelationship = userFamilies[otherfamily.from.id]
                    }
                    if(otherfamily.to.user){
                        userFamilies[otherfamily.to.user.id] = `${userFamilies[otherfamily.from.id]}的${relationshipMap[otherfamily.relationship]}`
                    }
                }else{
                    const getRelationship = reverseRelationship(otherfamily.relationship,otherfamily.from.gender)
                    const options = {
                        text:`${userFamilies[otherfamily.to.user.id]}的${getRelationship}`,	
                        sex: sexMap[me.gender],			//自己的性别：0女性,1男性
                        type:'default',		//转换类型：'default'算称谓,'chain'算关系(此时reverse无效)
                        reverse:true		//称呼方式：true对方称呼我,false我称呼对方
                    };
                    familyRelationships[otherfamily.id] = relationship(options)
                    userFamilies[otherfamily.from.id] = `${userFamilies[otherfamily.to.user.id]}的${getRelationship}`
                }
                
            }else{
                tempfamilies.push(otherfamily)
            }
        }
        otherfamilies = tempfamilies
        count++
    }

    return {familyRelationships,createrRelationship}
}