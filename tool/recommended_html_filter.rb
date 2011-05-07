# -*- coding: utf-8 -*-
#
# @file 
# @brief
# @author ongaeshi
# @date   2011/05/07

require 'cgi'

def firelink_filter(src)
  result = ""
  isClose = false

  src.each_line do |line|
    line.chomp!
    
    if (line =~ /^!\s*(.*)/)
      if (isClose)
        result += <<EOF
  </table>
EOF
      end
      
      result += <<EOF
  <h4>#{$1}</h4>
  <table>
EOF
      isClose = true
    else
      v = line.split("\t")

      if (v.size == 2)
        result += <<EOF  
      <tr class="recommended-raw"><td><span>#{v[0]}</span></td><td><span>#{CGI.escapeHTML(v[1])}</span></td></tr>
EOF
      end
    end
  end

  if (isClose)
    result += <<EOF
  </table>
EOF
  end

  result
end

open(ARGV[0]) do |f|
  puts firelink_filter(f.read)
end

