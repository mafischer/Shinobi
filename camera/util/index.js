const config = require('../../conf.json');
const moment = require('moment');
const exec = require('child_process').exec;
const crypto = require('crypto');

exports.systemlog = function(q,w,e){
    if(!w){w=''}
    if(!e){e=''}
    if(config.systemLog===true){
        return console.log(moment().format(),q,w,e)
    }
};

exports.md5 = function(x){
    return crypto.createHash('md5').update(x).digest("hex");
};

//kill any ffmpeg running
exports.ffmpegKill = function(){
    return exec("ps aux | grep -ie ffmpeg | awk '{print $2}' | xargs kill -9",{detached: true});
};

exports.tx =

exports.cx = function(z,y,x,io){
    if(x){
        return x.broadcast.to(y).emit('c',z)
    }
    io.to(y).emit('c',z);
};

exports.txWithSubPermissions=function(z,y,permissionChoices, s){
    if(typeof permissionChoices==='string'){
        permissionChoices=[permissionChoices]
    }
    if(s.group[z.ke]){
        Object.keys(s.group[z.ke].users).forEach(function(v){
            const user = s.group[z.ke].users[v];
            if(user.details.sub){
                if(user.details.allmonitors!=='1'){
                    let valid = 0;
                    const checked = permissionChoices.length;
                    permissionChoices.forEach(function(b){
                        if(user.details[b].indexOf(z.mid)!==-1){
                            ++valid;
                        }
                    });
                    if(valid===checked){
                        s.tx(z,user.cnid)
                    }
                }else{
                    s.tx(z,user.cnid)
                }
            }else{
                s.tx(z,user.cnid)
            }
        })
    }
};

//load camera controller vars
exports.nameToTime = function(x){
    x = x.split('.')[0].split('T');
    x[1] = x[1].replace(/-/g,':');
    x = x.join(' ');
    return x;
};

exports.ratio = function(width,height,ratio){
    ratio = width / height;
    return ( Math.abs( ratio - 4 / 3 ) < Math.abs( ratio - 16 / 9 ) ) ? '4:3' : '16:9';
};

exports.gid = function(x){
    if(!x){x=10};var t = "";
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( let i=0; i < x; i++ )
        t += p.charAt(Math.floor(Math.random() * p.length));
    return t;
};

exports.moment_withOffset=function(e,x){
    if(!e){e=new Date};if(!x){x='YYYY-MM-DDTHH-mm-ss'};
    e=moment(e);if(config.utcOffset){e=e.utcOffset(config.utcOffset)}
    return e.format(x);
};

exports.moment = function(e,x){
    if(!e){e=new Date};
    if(!x){x='YYYY-MM-DDTHH-mm-ss'};
    return moment(e).format(x);
};

exports.ipRange = function(start_ip, end_ip) {
    let start_long = toLong(start_ip);
    let end_long = toLong(end_ip);
    if (start_long > end_long) {
        let tmp=start_long;
        start_long=end_long
        end_long=tmp;
    }
    let range_array = [];
    let i;
    for (i=start_long; i<=end_long;i++) {
        range_array.push(fromLong(i));
    }
    return range_array;
};
exports.portRange=function(lowEnd,highEnd){
    let list = [];
    for (let i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
    return list;
};

exports.kill=function(x,e,p,s){
    if(s.group[e.ke]&&s.group[e.ke].mon[e.id]&&s.group[e.ke].mon[e.id].spawn !== undefined){
        if(s.group[e.ke].mon[e.id].spawn){
            try{
                s.group[e.ke].mon[e.id].spawn.removeListener('end',s.group[e.ke].mon[e.id].spawn_exit);
                s.group[e.ke].mon[e.id].spawn.removeListener('exit',s.group[e.ke].mon[e.id].spawn_exit);
                delete(s.group[e.ke].mon[e.id].spawn_exit);
            }catch(er){}
        }
        clearTimeout(s.group[e.ke].mon[e.id].checker);
        delete(s.group[e.ke].mon[e.id].checker);
        clearTimeout(s.group[e.ke].mon[e.id].watchdog_stop);
        delete(s.group[e.ke].mon[e.id].watchdog_stop);
        if(e&&s.group[e.ke].mon[e.id].record){
            clearTimeout(s.group[e.ke].mon[e.id].record.capturing);
//            if(s.group[e.ke].mon[e.id].record.request){s.group[e.ke].mon[e.id].record.request.abort();delete(s.group[e.ke].mon[e.id].record.request);}
        };
        if(s.group[e.ke].mon[e.id].child_node){
            s.cx({f:'kill',d:s.init('noReference',e)},s.group[e.ke].mon[e.id].child_node_id)
            if(s.group[e.ke].mon_conf[e.id].type===('socket'||'jpeg'||'pipe')){
                x.stdin.pause();p=x.pid;setTimeout(function(){x.kill('SIGTERM');delete(x);},500)
            }else{
                try{
                    x.stdin.setEncoding('utf8');x.stdin.write('q');
                }catch(er){}
            }
            setTimeout(function(){exec('kill -9 '+p,{detached: true})},1000)
        }
    }
};

exports.log=function(e,x,s,sql){
    if(!x||!e.mid){return}
    if(e.details&&e.details.sqllog==1){
        sql.query('INSERT INTO Logs (ke,mid,info) VALUES (?,?,?)',[e.ke,e.mid,s.s(x)]);
    }
    s.tx({f:'log',ke:e.ke,mid:e.mid,log:x,time:moment()},'GRP_'+e.ke);
//    exports.systemlog('s.log : ',{f:'log',ke:e.ke,mid:e.mid,log:x,time:moment()},'GRP_'+e.ke)
};

//toLong taken from NPM package 'ip'
function toLong(ip) {
    let ipl = 0;
    ip.split('.').forEach(function(octet) {
        ipl <<= 8;
        ipl += parseInt(octet);
    });
    return(ipl >>> 0);
}

//fromLong taken from NPM package 'ip'
function fromLong(ipl) {
    return ((ipl >>> 24) + '.' +
    (ipl >> 16 & 255) + '.' +
    (ipl >> 8 & 255) + '.' +
    (ipl & 255) );
}
