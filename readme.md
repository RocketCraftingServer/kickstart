
# Safir vs RocketCraftingServer

## Based on tech: Node.js, JS
## Tools: browserify

## This is all you need for standalone application supported with best custom clear code on both side (front/backend).
## RCS ia alias for RocketCraftingServer

## Start
```js
npm i
npm run demo5
```

## Hosting

If you wanna self hosting:

HTTP
```js
npm run host
```

HTTPS
```js
npm run https
```

Alternative : You can use any other web server.

## Routes [RCS]

<pre>
+----------+----------+---------------------------------------------------------------------------------+
|         kickstart [safir]                    ANY CLIENT                                               |
+----------+----------+---------------------------------------------------------------------------------+
           ^          |
           |          |
           |          |
           |          |
           |          |
           |          |        WEB SERVER [For hosting html5 clients also for rocketcraft api]
           |          |
+--------------------------------------------------------------------------------------------------------+
|          |          |                                                                                  |
|     +----+----------v-----------+                                    +-----------------------------+   |
|     |                           |                                    |                             |   |
|     |      REST API             |                                    |  HTTP, HTTPS (1.1 or 2)     |   |
|     | [/rocket/register]        |                                    |                             |   |
|     | [/rocket/confirmation]    |                                    +-----------------------------+   |
|     | [/rocket/register]        |                                                                      |
|     | [/rocket/login]           |                                                                      |
|     | [/rocket/fast-login]      |                                                                      |
|     | [/rocket/profile/upload]  |                                                                      |
|     | [/rocket/profile]         |                                                                      |
|     | [/rocket/profile-delete]  |                                                                      |
|     +---------------------------+                                                                      |
|                                                                                                        |
|  +------------------------------------------------------------+                                        |
|  SOURCE : https://github.com/zlatnaspirala/rocket-craft-server                                         |
|  +------------------------------------------------------------+                                        |
|                                                                                                        |
+--------------------------------------------------------------------------------------------------------+
|                                            NODEJS CORE                                                 |
+--------------------------------------------------------------------------------------------------------+
|                                           MONGO DATABASE                                               |
+--------------------------------------------------------------------------------------------------------+
</pre>
