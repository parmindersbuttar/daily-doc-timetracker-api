const database = require("../../config/database");
const RestrictedActivity = require("../models/RestrictedActivity");

const dbService = (environment, migrate) => {
  const authenticateDB = () => database.authenticate();

  const dropDB = () => database.drop();

  const syncDB = () => database.sync();

  const successfulDBStart = async () => {
    console.info(
      "connection to the database has been established successfully"
    );
    await addRestrictedActivitySeeds();
  };

  const errorDBStart = err =>
    console.info("unable to connect to the database:", err);

  const wrongEnvironment = () => {
    console.warn(
      `only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`
    );
    return process.exit(1);
  };

  const startMigrateTrue = async () => {
    try {
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startMigrateFalse = async () => {
    try {
      await dropDB();
      await syncDB();
      successfulDBStart();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startDev = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startStage = async () => {
    try {
      await authenticateDB();

      if (migrate) {
        return startMigrateTrue();
      }

      return startMigrateFalse();
    } catch (err) {
      return errorDBStart(err);
    }
  };

  const startTest = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const startProd = async () => {
    try {
      await authenticateDB();
      await startMigrateFalse();
    } catch (err) {
      errorDBStart(err);
    }
  };

  const addRestrictedActivitySeeds = async () => {
    const restrictedWebsites = [
      { name: "www.43things.com" },
      { name: "www.4chan.org" },
      { name: "www.82apps.com" },
      { name: "www.8ch.net" },
      { name: "www.8chan.co" },
      { name: "www.9gag.com" },
      { name: "www.9to5mac.com" },
      { name: "www.abcnews.go.com" },
      { name: "www.addictinggames.com" },
      { name: "www.addthis.com" },
      { name: "www.agar.io" },
      { name: "www.airbnb.com" },
      { name: "www.albinoblacksheep.com" },
      { name: "www.allmyfaves.com" },
      { name: "www.allthingsd.com" },
      { name: "www.allvid.ch" },
      { name: "www.alternativeto.net" },
      { name: "www.amazon.com" },
      { name: "www.andkon.com" },
      { name: "www.angel.co" },
      { name: "www.aniwey.net" },
      { name: "www.aol.com" },
      { name: "www.appsandoranges.com" },
      { name: "www.ardmediathek.de" },
      { name: "www.arstechnica.com" },
      { name: "www.artsy.net" },
      { name: "www.ask.fm" },
      { name: "www.auroravid.to" },
      { name: "www.betali.st" },
      { name: "www.bidvoy.net" },
      { name: "www.biqle.ru" },
      { name: "www.bitvid.sx" },
      { name: "www.blogspot.com" },
      { name: "www.bloomberg.com" },
      { name: "www.blowcomics.com" },
      { name: "www.bo.lt" },
      { name: "www.boingboing.net" },
      { name: "www.bored.com" },
      { name: "www.branch.com" },
      { name: "www.break.com" },
      { name: "www.briskfile.com" },
      { name: "www.bud.ge" },
      { name: "www.bufferapp.com" },
      { name: "www.buildandshoot.com" },
      { name: "www.businessinsider.com" },
      { name: "www.buy.com" },
      { name: "www.buzzfeed.com" },
      { name: "www.cad-comic.com" },
      { name: "www.camelcamelcamel.com" },
      { name: "www.canada.com" },
      { name: "www.candybox2.net" },
      { name: "www.candystand.com" },
      { name: "www.cheapassgamer.com" },
      { name: "www.cheezburger.com" },
      { name: "www.chime.in" },
      { name: "www.chrome.google.com" },
      { name: "www.circleme.com" },
      { name: "www.cloudtime.to" },
      { name: "www.cloudy.ec" },
      { name: "www.collegehumor.com" },
      { name: "www.comcast.net" },
      { name: "www.coolrom.com" },
      { name: "www.cracked.com" },
      { name: "www.craigslist.org" },
      { name: "www.crunchbase.com" },
      { name: "www.crystalmathlabs.com" },
      { name: "www.cubers.net" },
      { name: "www.cull.tv" },
      { name: "www.cultofmac.com" },
      { name: "www.daclips.in" },
      { name: "www.dailydot.com" },
      { name: "www.dailymotion.com" },
      { name: "www.dashnet.org" },
      { name: "www.deadspin.com" },
      { name: "www.delicious.com" },
      { name: "www.desura.com" },
      { name: "www.deviantart.com" },
      { name: "www.devour.com" },
      { name: "www.digg.com" },
      { name: "www.divxme.com" },
      { name: "www.divxstage.to" },
      { name: "www.docs.google.com" },
      { name: "www.dpadd.com" },
      { name: "www.draynor.net" },
      { name: "www.drive.google.com" },
      { name: "www.dropvideo.com" },
      { name: "www.dzone.com" },
      { name: "www.ebaumsworld.com" },
      { name: "www.ebay.com" },
      { name: "www.edition.cnn.com" },
      { name: "www.eeemo.net" },
      { name: "www.elderscrollsonline.com" },
      { name: "www.engadget.com" },
      { name: "www.entervideo.net" },
      { name: "www.espn.go.com" },
      { name: "www.estream.to" },
      { name: "www.evernote.com" },
      { name: "www.explosm.net" },
      { name: "www.extensions" },
      { name: "www.facebook.com" },
      { name: "www.fark.com" },
      { name: "www.feedly.com" },
      { name: "www.filenuke.com" },
      { name: "www.flashx.tv" },
      { name: "www.flixster.com" },
      { name: "www.fluther.com" },
      { name: "www.forbes.com" },
      { name: "www.foundation.bz" },
      { name: "www.freakshare.com" },
      { name: "www.funnyjunk.com" },
      { name: "www.funnyordie.com" },
      { name: "www.game-oldies.com" },
      { name: "www.gamepedia.com" },
      { name: "www.gamovideo.com" },
      { name: "www.gawker.com" },
      { name: "www.getglue.com" },
      { name: "www.getprismatic.com" },
      { name: "www.gigaom.com" },
      { name: "www.gizmodo.com" },
      { name: "www.gocomics.com" },
      { name: "www.goodvideohost.com" },
      { name: "www.gorillavid.in" },
      { name: "www.greevid.com" },
      { name: "www.hivereader.com" },
      { name: "www.homestarrunner.com" },
      { name: "www.huffingtonpost.com" },
      { name: "www.hulu.com" },
      { name: "www.hunch.com" },
      { name: "www.idowatch.net" },
      { name: "www.ifttt.com" },
      { name: "www.imgur.com" },
      { name: "www.indieflix.com" },
      { name: "www.indiegogo.com" },
      { name: "www.instagram.com" },
      { name: "www.invisionfree.com" },
      { name: "www.io9.com" },
      { name: "www.itunes.apple.com" },
      { name: "www.jalopnik.com" },
      { name: "www.jezebel.com" },
      { name: "www.jukejuice.com" },
      { name: "www.justin.tv" },
      { name: "www.kag2d.com" },
      { name: "www.kickstarter.com" },
      { name: "www.kinja.com" },
      { name: "www.knowyourmeme.com" },
      { name: "www.koalabeast.com" },
      { name: "www.kongregate.com" },
      { name: "www.kotaku.com" },
      { name: "www.kurzweilai.net" },
      { name: "www.launch.co" },
      { name: "www.leetscape.com" },
      { name: "www.letwatch.us" },
      { name: "www.lifehacker.com" },
      { name: "www.livejournal.com" },
      { name: "www.liveleak.com" },
      { name: "www.loadingartist.com" },
      { name: "www.lofog.com" },
      { name: "www.longform.org" },
      { name: "www.makeuseof.com" },
      { name: "www.mashable.com" },
      { name: "www.medium.com" },
      { name: "www.metacafe.com" },
      { name: "www.metafilter.com" },
      { name: "www.minecraft.net" },
      { name: "www.minecraftforum.net" },
      { name: "www.miniclip.com" },
      { name: "www.minus.com" },
      { name: "www.movdivx.com" },
      { name: "www.movpod.in" },
      { name: "www.movshare.net" },
      { name: "www.mp4upload.com" },
      { name: "www.mspaintadventures.com" },
      { name: "www.myspace.com" },
      { name: "www.myvideo.de" },
      { name: "www.nayavideo.com" },
      { name: "www.neatorama.com" },
      { name: "www.neodrive.co" },
      { name: "www.newegg.com" },
      { name: "www.newgrounds.com" },
      { name: "www.news.google.com" },
      { name: "www.news.ycombinator.com" },
      { name: "www.newsblur.com" },
      { name: "www.newsle.com" },
      { name: "www.noowit.com" },
      { name: "www.noslocker.com" },
      { name: "www.nosvideo.com" },
      { name: "www.novamov.com" },
      { name: "www.nowvideo.ch" },
      { name: "www.nowvideo.co" },
      { name: "www.nowvideo.sx" },
      { name: "www.nowvideo.to" },
      { name: "www.ok.ru" },
      { name: "www.oload.tv" },
      { name: "www.openload.co" },
      { name: "www.openload.io" },
      { name: "www.overstock.com" },
      { name: "www.pandodaily.com" },
      { name: "www.path.com" },
      { name: "www.pbfcomics.com" },
      { name: "www.penny-arcade.com" },
      { name: "www.pheed.com" },
      { name: "www.pinboard.in" },
      { name: "www.pinterest.com" },
      { name: "www.play.google.com" },
      { name: "www.playedto.me" },
      { name: "www.playreplay.net" },
      { name: "www.plus.google.com" },
      { name: "www.polygon.com" },
      { name: "www.popurls.com" },
      { name: "www.potluck.it" },
      { name: "www.powvideo.net" },
      { name: "www.primeshare.tv" },
      { name: "www.promptfile.com" },
      { name: "www.purefreetoplay.com" },
      { name: "www.quora.com" },
      { name: "www.qz.com" },
      { name: "www.rapidvideo.com" },
      { name: "www.rapidvideo.ws" },
      { name: "www.raptr.com" },
      { name: "www.raptu.com" },
      { name: "www.realmofthemadgod.com" },
      { name: "www.reddit.com" },
      { name: "www.rottentomatoes.com" },
      { name: "www.rsbandb.com" },
      { name: "www.runeclan.com" },
      { name: "www.runehead.com" },
      { name: "www.runehints.com" },
      { name: "www.runehq.com" },
      { name: "www.runemonkey.net" },
      { name: "www.runescape.com" },
      { name: "www.runetrack.com" },
      { name: "www.runetracker.org" },
      { name: "www.runeweb.net" },
      { name: "www.runewise.net" },
      { name: "www.salmoneus.net" },
      { name: "www.scape-xp.com" },
      { name: "www.sendvid.com" },
      { name: "www.shared.sx" },
      { name: "www.sharesix.com" },
      { name: "www.sharethis.com" },
      { name: "www.slashdot.com" },
      { name: "www.slashdot.org" },
      { name: "www.slate.com" },
      { name: "www.slatestarcodex.com" },
      { name: "www.slither.io" },
      { name: "www.smbc-comics.com" },
      { name: "www.snapzu.com" },
      { name: "www.snopes.com" },
      { name: "www.sortable.com" },
      { name: "www.southparkstudios.com" },
      { name: "www.speedvid.net" },
      { name: "www.speedvideo.net" },
      { name: "www.spring.me" },
      { name: "www.stagevu.com" },
      { name: "www.steampowered.com" },
      { name: "www.stellar.io" },
      { name: "www.store.maxdome.de" },
      { name: "www.strawpoll.me" },
      { name: "www.streamcloud.eu" },
      { name: "www.streamin.to" },
      { name: "www.streamplay.to" },
      { name: "www.stumbleupon.com" },
      { name: "www.stylee32.net" },
      { name: "www.swiftirc.net" },
      { name: "www.teamcoco.com" },
      { name: "www.teamfortress.com" },
      { name: "www.techcrunch.com" },
      { name: "www.techmeme.com" },
      { name: "www.techvibes.com" },
      { name: "www.theneeds.com" },
      { name: "www.thenextweb.com" },
      { name: "www.theoatmeal.com" },
      { name: "www.theoldreader.com" },
      { name: "www.theonion.com" },
      { name: "www.theverge.com" },
      { name: "www.thevideo.me" },
      { name: "www.thevideobee.to" },
      { name: "www.thevideos.tv" },
      { name: "www.tip.it" },
      { name: "www.titanfall.com" },
      { name: "www.tmz.com" },
      { name: "www.transformice.com" },
      { name: "www.tumblr.com" },
      { name: "www.tweettabs.com" },
      { name: "www.twitch.tv" },
      { name: "www.twitter.com" },
      { name: "www.uptostream.com" },
      { name: "www.userscloud.com" },
      { name: "www.userscripts.org" },
      { name: "www.usersfiles.com" },
      { name: "www.userstyles.org" },
      { name: "www.ustream.tv" },
      { name: "www.valvesoftware.com" },
      { name: "www.veehd.com" },
      { name: "www.venturebeat.com" },
      { name: "www.veoh.com" },
      { name: "www.versus.com" },
      { name: "www.vgcats.com" },
      { name: "www.vice.com" },
      { name: "www.vid.gg" },
      { name: "www.vid.me" },
      { name: "www.vidabc.com" },
      { name: "www.video.tt" },
      { name: "www.videosift.com" },
      { name: "www.videoweed.es" },
      { name: "www.videowood.tv" },
      { name: "www.vidgg.to" },
      { name: "www.vidlox.tv" },
      { name: "www.vidto.me" },
      { name: "www.vidtodo.com" },
      { name: "www.vidup.me" },
      { name: "www.vidzi.tv" },
      { name: "www.vimeo.com" },
      { name: "www.vimple.ru" },
      { name: "www.virtualnes.com" },
      { name: "www.vivo.sx" },
      { name: "www.vk.com" },
      { name: "www.voat.co" },
      { name: "www.vodlock.co" },
      { name: "www.vshare.eu" },
      { name: "www.vshare.io" },
      { name: "www.wallbase.cc" },
      { name: "www.wanelo.com" },
      { name: "www.watchers.to" },
      { name: "www.wholecloud.net" },
      { name: "www.wikia.com" },
      { name: "www.wikipedia.org" },
      { name: "www.wimp.com" },
      { name: "www.wired.com" },
      { name: "www.wizards.com" },
      { name: "www.xkcd.com" },
      { name: "www.xvidstage.com" },
      { name: "www.yoleoreader.com" },
      { name: "www.yourvideohost.com" },
      { name: "www.yourworldoftext.com" },
      { name: "www.youtube.com" },
      { name: "www.youwatch.org" },
      { name: "www.ytmnd.com" },
      { name: "www.zdf.de" },
      { name: "www.zetaboards.com" },
      { name: "www.zifboards.com" },
      { name: "www.zybez.net" },
      { name: "www.zynga.com" },
      { name: "www.youtube.com" },
      { name: "www.google.news.com" },
      { name: "www.espn.com" },
      { name: "www.bleacherreport.com" },
      { name: "www.netflix.com" },
      { name: "www.instagram.com" },
      { name: "www.reddit.com" },
      { name: "www.netflix.com" },
      { name: "www.newyorktimes.com" },
      { name: "www.vsco.com" },
      { name: "www.fivethirtyeight.com" },
      { name: "www.pornhub.com" },
      { name: "www.twitter.com" },
      { name: "www.nba.com" },
      { name: "www.kenpom.com" },
      { name: "www.keepingitheel.com" },
      { name: "www.xvideos.com" },
      { name: "www.facebook.com" },
      { name: "www.quora.com" },
      { name: "www.lichess.com" },
      { name: "www.chesss.com" },
      { name: "www.lichess.com" },
      { name: "www.atp.com" },
      { name: "www.soundcloud.com" },
      { name: "www.https.com" },
      { name: "www.cnn.com" },
      { name: "www.yahoo.sports.com" },
      { name: "www.spotify.com" },
      { name: "www.news.google.com" },
      { name: "www.nytimes.com" },
      { name: "www.pandora.com" },
      { name: "www.play.google.com" },
      { name: "www.atptour.com" },
      { name: "www.linkedin.com" },
      { name: "www.news.ycombinator.com" },
      { name: "www.youtube.co" }
    ];

    try {
      const isExist = await RestrictedActivity.findAll();

      if (!isExist.length) {
        await RestrictedActivity.bulkCreate(restrictedWebsites);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const start = async () => {
    switch (environment) {
      case "development":
        await startDev();
        break;
      case "staging":
        await startStage();
        break;
      case "testing":
        await startTest();
        break;
      case "production":
        await startProd();
        break;
      default:
        await wrongEnvironment();
    }
  };

  return {
    start
  };
};

module.exports = dbService;
