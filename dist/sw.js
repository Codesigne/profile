importScripts('cache-polyfill.js');

var APP_PREFIX = 'ApplicationName_'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/profile/dist/',                     // If you have separate JS/CSS files,
  '/profile/dist/index.html'            // add path to those files here
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})

self.addEventListener('message', function(event) {
    console.log('message triggered event', event)
    console.log('Notification.permission :', Notification.permission)
    if (event.data !== undefined) {
         console.log('event.data !== undefined', event.data)
         if (event.data.type === 'USERLOGON_1') {
            console.log("event.data.type === 'USERLOGON_1'")
            if (Notification.permission === "granted") {
                console.log('Notification.permission === "granted"')
                self.registration.showNotification("TTTTTTUnauthurized tag Unauthurized check in.", {
                    tag: 'TTTTTTUnauthurized Unauthurized check in',
                    // renotify:true,
                    // timestamp: Date.now(),
                    body:"want to look at it ?",
                    requireInteraction: true,
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                    actions: [
                        { action: 'like', title: '👍Yes' },
                        { action: 'reply', title: '⤻ Reply' }
                    ]
                });
            }
            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== "denied") {
                console.log('Notification.permission !== "denied"')
              
                Notification.requestPermission().then(function(permission) {
                    // If the user accepts, let's create a notification
                    console.log('requestPermission in then')
                  
                    if (Notification.permission === "granted") {
                        console.log('requestPermission in then granted')
                      
                        // If it's okay let's create a notification
                        // console.log("Want to check in ? ");

                        self.registration.showNotification
                        self.registration.showNotification("TTTTTTUnauthurized tag Unauthurized check in.", {
                            body:"want to look at it ?",
                            tag: 'TTTTTTUnauthurized check in',
                            // renotify:true,
                            // timestamp: Date.now(),
                            requireInteraction: true,
                            vibrate: [200, 100, 200, 100, 200, 100, 200],
                            actions: [
                                { action: 'like', title: '👍Yes' },
                                { action: 'reply', title: '⤻ Reply' }
                            ]
                        });;
                    }
                });
            }

        }
    } else if (event.data !== undefined) {

    }
});
