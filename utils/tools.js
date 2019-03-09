import { AsyncStorage } from "react-native"

// 删除空格
export const trim=(str)=>str.replace(/(^\s*)|(\s*$)/g, ""); 
export const checkName = (name)=>{
    const rxName =/^[A-z\d()\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if(!rxName.test(name)){
      throw new Error('你的姓名错误')
    }
  }
export const errorMessage = (error)=>error.message.replace(/GraphQL error:/g, "").replace(/Network error:/g, "")
export const checkNum = (str)=>{
  if(!/^\d+$/.test(str)){
     return false
    }
  return true
}
export const grades = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' }  
export const educations = {
  "PrimarySchool":"初等教育-小学",
  "JuniorMiddleSchool":"中等教育-初中",
  "HighSchool":"中等教育-高中",
  "VocationalHighSchool":"中等教育-职业中学",
  "TechnicalSchool":"中等教育-技工学校",
  "SecondarySpecializedSchool":"中等教育-中等专业学校",
  "JuniorCollege":"普通高等教育-大专",
  "Undergraduate":"普通高等教育-本科",
  "Master":"普通高等教育-硕士",
  "Doctor":"普通高等教育-博士",
  "JuniorToCollege":"成人高等教育-专科起点本科",
  "HighToCollege":"成人高等教育-高中起点升本科",
  "HighToJunior":"成人高等教育-高中起点升专科"
}

export const timeTodate = (startTime,endTime) =>{
  const startYear = (new Date(startTime)).getFullYear()
  const startMonth = (new Date(startTime)).getMonth() + 1
  const endYear = (new Date(endTime)).getFullYear()
  const endMonth = (new Date(endTime)).getMonth() +1
  if(endYear===9999){
      return `${startYear}.${startMonth}-至今`
  }
  return `${startYear}.${startMonth}-${endYear}.${endMonth}`
}

export const storeMessage = async (key,message) => {
  // 检查id是否为乐观更新的id
  if(message.id.length<10) return 
  try {
    let prev
    prev = await AsyncStorage.getItem(key);
    console.log('prev',prev)
    if(!prev){
      prevMessages = []
    }else{
      prevMessages = JSON.parse(prev)
    }
    // 检查是否重复
    const isExist = prevMessages.filter(m=>m.id===message.id && m.createdAt===message.createdAt).length>0
    if(!isExist){
      prevMessages.push(message);
      await AsyncStorage.setItem(key,JSON.stringify(prevMessages) );
    }
  } catch (error) {
   console.log(error)
  }
}

export const retrieveMessages = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
    return '[]'
   } catch (error) {
     console.log(error.message)
   }
}

export const getRelationshipName = (relationship)=>{
  switch (relationship) {
    case "father":
      return "父"
      break;
    case "mother":
      return "母"
      break;
    case 'oldbrother':
      return "兄"
      break;
    case 'youngbrother':
      return "弟"
      break;
    case 'oldsister':
      return "姐"
      break;
    case 'youngsister':
      return "妹"
      break;
    case 'wife':
      return "妻"
      break;
    case 'husband':
      return "夫"
      break;
    case 'son':
      return "儿"
      break;
    case 'daughter':
      return "女"
      break;
    case 'sister':
      return "姐妹"
      break
    case 'brother':
      return "兄弟"
      break
    default:
      return null
  }
}


export const getRelationshipNameTwo = (relationship)=>{
  switch (relationship) {
    case "father":
      return "父亲"
      break;
    case "mother":
      return "母亲"
      break;
    case 'oldbrother':
      return "兄长"
      break;
    case 'youngbrother':
      return "弟弟"
      break;
    case 'oldsister':
      return "姐姐"
      break;
    case 'youngsister':
      return "妹妹"
      break;
    case 'wife':
      return "妻子"
      break;
    case 'husband':
      return "丈夫"
      break;
    case 'son':
      return "儿子"
      break;
    case 'daughter':
      return "女儿"
      break;
    case 'sister':
      return "姐妹"
      break
    case 'brother':
      return "兄弟"
      break
    default:
      return null
  }
}

export const display=(place)=>{
  let displayPlace
  if(place.village){
    displayPlace = place.province.name+place.city.name+place.area.name+place.street.name+place.village.name
  }else if(place.street){
    displayPlace = place.province.name+place.city.name+place.area.name+place.street.name
  }else if(place.area){
    displayPlace = place.province.name+place.city.name+place.area.name
  }else if(place.city){
    displayPlace = place.province.name+place.city.name
  }else if(place.province){
    displayPlace = place.province.name
  }else{
    displayPlace='未填写'
  }
  return displayPlace
}




