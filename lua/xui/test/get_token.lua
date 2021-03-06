-- print("test start ... \n")

local cur_dir = debug.getinfo(1).source;
cur_dir = string.gsub(cur_dir, "^@(.+)/test/get_token.lua$", "%1")
package.path = package.path .. ";" .. cur_dir .. "/vendor/?.lua"
package.path = package.path .. ";" .. cur_dir .. "/model/?.lua"

-- stream:write(package.path)
-- stream:write("test start\n")

require 'xdb'
require 'xwechat'
require 'm_dict'
require 'xtra_config'
require 'utils'

if config.db_auto_connect then xdb.connect(config.dsn) end

realm = argv[1] or 'xyt'

local wechat = m_dict.get_obj('WECHAT/' .. realm)
token = xwechat.get_token(realm, wechat.APPID, wechat.APPSEC)

stream:write("token: " .. token .. "\n")
