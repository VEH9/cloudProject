FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY avatariki.csproj ./
RUN dotnet restore avatariki.csproj    

COPY . .
RUN dotnet build avatariki.csproj -c Release -o out
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/out .
COPY --from=build-env /app/Properties/launchSettings.json ./Properties/launchSettings.json
COPY --from=build-env /app/.version ./.version

RUN apt update
RUN apt install -y libc-dev

ENTRYPOINT ["dotnet", "avatariki.dll"]