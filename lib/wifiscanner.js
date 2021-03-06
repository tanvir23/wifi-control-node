// Generated by CoffeeScript 1.12.4
(function() {
  var airport, deLocale, enLocale, fs, fullLocale, iwlist, netsh, nmcli, osLocale, scan, setLocale, terms;

  fs = require('fs');

  osLocale = require('os-locale');

  airport = require('node-wifiscanner2/lib/airport');

  iwlist = require('node-wifiscanner2/lib/iwlist');

  nmcli = require('node-wifiscanner2/lib/nmcli');

  netsh = require('node-wifiscanner2/lib/netsh');

  enLocale = require('node-wifiscanner2/locales/en.json');

  deLocale = require('node-wifiscanner2/locales/de.json');

  terms = void 0;

  fullLocale = osLocale.sync({
    spawn: true
  }) || 'en_US';


  /** quick-fix:start * */

  setLocale = function(locale) {
    var shortLocale;
    shortLocale = locale.split('_')[0];
    if (shortLocale.indexOf('de') >= 0) {
      terms = deLocale;
    } else {
      terms = enLocale;
    }
  };


  /** quick-fix:end * */

  scan = function(callback) {
    fs.exists(airport.utility, function(exists) {
      if (exists) {
        airport.scan(terms.airport, callback);
        return;
      }
      fs.exists(nmcli.utility, function(exists) {
        if (exists) {
          nmcli.scan(terms.nmcli, callback);
          return;
        }
        fs.exists(iwlist.utility, function(exists) {
          if (exists) {
            iwlist.scan(terms.iwlist, callback);
            return;
          }
          fs.exists(netsh.utility, function(exists) {
            if (exists) {
              netsh.scan(terms.netsh, callback);
              return;
            }
            callback('No scanning utility found', null);
          });
        });
      });
    });
  };

  setLocale(fullLocale);

  exports.scan = scan;

  exports.setLocale = setLocale;

}).call(this);
