const conf = require('../../conf.json');
const Path = require('path');
const fs = require('fs');
let config = Object.assign(conf, {
    child_key: '3123asdasdf1dtj1hjk23sdfaasd12asdasddfdbtnkkfgvesra3asdsd3123afdsfqw345',
    cpuUsageMarker: conf.cpuUsageMarker? conf.cpuUsageMarker: '%Cpu',
    autoDropCache: conf.autoDropCache? conf.autoDropCache: true,
    doSnapshot: conf.doSnapshot? conf.doSnapshot: true,
    systemLog: conf.systemLog? conf.systemLog: true,
    deleteCorruptFiles: conf.deleteCorruptFiles? conf.deleteCorruptFiles: true
});
if(!config.hasOwnProperty('restart')){
    config.restart = {};
}
if(!config.restart.hasOwnProperty('onVideoNotExist')){
    config.restart.onVideoNotExist = true;
}
if(conf.ip===undefined||conf.ip===''||conf.ip.indexOf('0.0.0.0')>-1){
    config.ip = 'localhost';
} else{
    config.bindip = conf.ip
}
if(!config.hasOwnProperty('cron')){
    config.cron = {};
}
if(!config.cron.hasOwnProperty('deleteOverMax')){
    config.cron.deleteOverMax = true;
}
if(!config.cron.hasOwnProperty('deleteOverMaxOffset')){
    config.cron.deleteOverMaxOffset = 0.9;
}
if(!config.hasOwnProperty('pluginKeys')){
    config.pluginKeys={};
}
//ffmpeg location
if(!config.hasOwnProperty('ffmpegDir')){
    config.ffmpegDir = process.platform === 'wind32'? Path.resolve(__dirname,'../','/ffmpeg/ffmpeg.exe'): 'ffmpeg';
}

//directories
if(!config.hasOwnProperty('windowsTempDir') && process.platform === 'win32') {
    config.windowsTempDir = 'C:/Windows/Temp';
}
if(!config.hasOwnProperty('defaultMjpeg')){
    config.defaultMjpeg=__dirname+'/web/libs/img/bg.jpg'
}
//default stream folder check
if(!config.hasOwnProperty('streamDir')){
    if(process.platform !== 'wind32'){
        config.streamDir='/dev/shm';
    }else{
        config.streamDir=config.windowsTempDir
    }
    if(!fs.existsSync(config.streamDir)){
        config.streamDir=Path.resolve(__dirname,'../../streams/');
    }else{
        config.streamDir+='/streams/';
    }
}
//default buffer folder check
if(!config.bufferDir){
    if(process.platform !== 'wind32'){
        config.bufferDir='/dev/shm';
    }else{
        config.bufferDir=config.windowsTempDir
    }
    if(!fs.existsSync(config.bufferDir)){
        config.bufferDir= Path.resolve(__dirname,'../../buffer/');
    }else{
        config.bufferDir+='/buffer/';
    }
}
if(!config.videosDir){
    config.videosDir= Path.resolve(__dirname,'../../videos/');
}

module.exports = config;