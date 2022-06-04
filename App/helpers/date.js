const today=()=>{
    let _locale='es'
    let _date=new Date()//Today
    let _day=_date.getDate()
    let _month=_date.getMonth()//Current Month
    let _year=_date.getFullYear()//Current Year
    
    // let _fullDate=new Intl.DateTimeFormat(_locale).format(new Date(_date))// d/m/y
    
    // let _monthName=new Intl.DateTimeFormat(_locale,{month:'long'}).format(new Date(_year,_month))//Current month name
    
    return {day:_day,month:_month,year:_year}

}

export default {today}