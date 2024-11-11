CREATE TABLE League (
    LeagueID INT PRIMARY KEY IDENTITY(1,1),
    LeagueName NVARCHAR(255) NOT NULL,
    CreatedBy NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Team (
    TeamID INT PRIMARY KEY IDENTITY(1,1),
    TeamName NVARCHAR(255) NOT NULL,
    UserID NVARCHAR(255) NOT NULL,  -- User identification, can be email or userID
    LeagueID INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (LeagueID) REFERENCES League(LeagueID)
);
