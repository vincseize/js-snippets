var newid = padNum(3);//003
var newid = padNum(3,4);//0003

function padNum(num,length)
{
    return Array((length||3)-((num+"").length-1)).join("0")+num;
}
