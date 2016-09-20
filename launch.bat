@echo off
@title ArchonMS Server Console
set CLASSPATH=.;dist\*
java -Xmx6400m -Dwzpath=wz\ net.server.Server
pause