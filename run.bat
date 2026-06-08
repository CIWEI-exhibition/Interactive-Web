@echo off
set JAVA_HOME=C:\Program Files\Java\jdk-17.0.1
set PATH=%JAVA_HOME%\bin;%PATH%
echo JAVA_HOME set to %JAVA_HOME%
echo Starting AQUAURORE backend...
gradlew.bat bootRun
