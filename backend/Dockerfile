# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["api/api.csproj", "api/"]
RUN dotnet restore "api/api.csproj"

# Install EF Core tools (needs SDK)
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

COPY . ./
WORKDIR "/src/api"

# Run the migration — database will be generated here
RUN dotnet ef database update --project api.csproj

# Build the app
RUN dotnet publish "api.csproj" -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copy published output
COPY --from=build /app/publish ./

# Copy the SQLite DB file generated during build
COPY --from=build /src/api/TravelJournal.db ./

ENV ConnectionStrings__DefaultConnection="Data Source=TravelJournal.db"

ENTRYPOINT ["dotnet", "api.dll"]
