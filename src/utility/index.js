const arr2 = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const numMonth=["01" ,"02" ,"03" ,"04" ,"05" ,"06" ,"07" ,"08" ,"09" , "10" ,"11" ,"12" ];
export const getDisplayDate=(DateValue , type)=>{
    
      const arr = DateValue.substr(0, 10).split("-");
      const str2 = `${arr[1]} ${arr2[Number(arr[0])-1]} ${arr[2]}`;
     return str2
       
}

export const sendDate=(DateValue , type)=>{
const arr=DateValue.split("-");
return `${arr[2]} ${arr2[Number(arr[1])-1]} ${arr[0]} 12:00 AM`
}

export const sendDisplayDate=(DateValue)=>{
  
    const sec=new Date(DateValue).getTime();
    const t1=new Date(sec-86400000);
    return `${t1.getFullYear()}-${numMonth[t1.getMonth()]}-${t1.getDate()}T18:30:00.000Z`;
}

export const isOverDue=(DateValue)=>{
   const sec=new Date(DateValue.split(" ")[0]).getTime();
   const sec2=new Date();
   return  sec2-sec > 1 ? true : false; 

}


export const getTodaysDate = () => {
  let endDate = new Date();

  let date1 = endDate.getDate();
  let month1 = endDate.getMonth() + 1;
  let year1 = endDate.getUTCFullYear();

  if (date1 < 10) {
    date1 = "0" + date1;
  }
  if (month1 < 10) {
    month1 = "0" + month1;
  }

  let string1 = year1 + "-" + month1 + "-" + date1;
  return string1;
};

const getNumMonth=(value)=>{
const d= arr2.indexOf(value);
if(d+1<10){
  return `0${d+1}`;
}
else return d+1;
}

const getNumDate=(date)=>{
  const num=Number(date)+1;
  if(num<10){
    return `0${num}`
  }
  else return num

}

export const getStringDate=(dateArr)=>{
return  `${dateArr[3]}-${getNumMonth(dateArr[2])}-${getNumDate(dateArr[1])}`;



}