@echo off
@title Drop Spider
set CLASSPATH=.;dist\*
java -Xmx6400m -server -Dwzpath=wz\ dropspider.Main
pause