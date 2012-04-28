inotifywait -qrm --format "%w %:e %f %T" -e modify --timefmt "%T" ./src/ | while read -s file; do
    echo $file changed... compiling...
    haxe compile.hxml;
done
