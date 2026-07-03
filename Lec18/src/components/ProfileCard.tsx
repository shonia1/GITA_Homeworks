interface ProfileCardProps {
  userData: {
    avatar_url: string;
    login: string;
    name?: string;
    created_at: string;
    bio?: string;
    public_repos: number;
    followers: number;
    following: number;
    location?: string;
    twitter_username?: string;
    blog?: string;
    company?: string;
  };
  formatDate: (dateString: string) => string;
}

export default function ProfileCard({
  userData,
  formatDate,
}: ProfileCardProps) {
  return userData ? (
    <article className="profile-card">
      {/*პროფილის ბარათი
            (რენდერდება მხოლოდ მაშინ, თუ მონაცემები წარმატებით ჩაიტვირთა) */}
      {/* მარცხენა მხარე: ავატარი */}
      <div className="profile-left">
        <img
          className="profile-card-photo"
          src={userData.avatar_url}
          alt={userData.login}
        />
      </div>

      {/* მარჯვენა მხარე: სრული ინფორმაცია */}
      <div className="profile-right">
        <div className="profile-card-header">
          <div className="profile-title-info">
            {/* თუ სახელი არ აქვს მითითებული, გამოჩნდება იუზერნეიმი */}
            <h2 className="profile-card-name">
              {userData.name || userData.login}
            </h2>
            <a
              href={`https://github.com/${userData.login}`}
              target="_blank"
              rel="noreferrer"
              className="profile-card-handle"
            >
              @{userData.login}
            </a>
          </div>
          <p className="profile-card-joined">
            Joined {formatDate(userData.created_at)}
          </p>
        </div>

        {/* ბიოგრაფია - თუ არ აქვს, ვამატებთ no-bio კლასს, რომ ოდნავ გავაღიავოთ ტექსტი */}
        <p className={`profile-card-bio ${!userData.bio ? "no-bio" : ""}`}>
          {userData.bio || "This profile has no bio"}
        </p>

        {/* სტატისტიკის პანელი */}
        <ul className="profile-card-stats">
          <li className="stat-item">
            <span className="stat-label">Repos</span>
            <span className="stat-value">{userData.public_repos}</span>
          </li>
          <li className="stat-item">
            <span className="stat-label">Followers</span>
            <span className="stat-value">{userData.followers}</span>
          </li>
          <li className="stat-item">
            <span className="stat-label">Following</span>
            <span className="stat-value">{userData.following}</span>
          </li>
        </ul>

        {/* სოციალური და დამატებითი ბმულები */}
        <ul className="profile-card-links">
          {/* თუ ლოკაცია არაა მითითებული, ვამატებთ disabled კლასს */}
          <li className={`link-item ${!userData.location ? "disabled" : ""}`}>
            <img src="/location-icon.svg" alt="location" />
            <span>{userData.location || "Not Available"}</span>
          </li>

          <li
            className={`link-item ${!userData.twitter_username ? "disabled" : ""}`}
          >
            <img src="/twitter-icon.svg" alt="twitter" />
            {userData.twitter_username ? (
              <a
                href={`https://twitter.com/${userData.twitter_username}`}
                target="_blank"
                rel="noreferrer"
              >
                {userData.twitter_username}
              </a>
            ) : (
              <span>Not Available</span>
            )}
          </li>

          <li className={`link-item ${!userData.blog ? "disabled" : ""}`}>
            <img src="/website-icon.svg" alt="website" />
            {userData.blog ? (
              <a
                href={
                  userData.blog.startsWith("http")
                    ? userData.blog
                    : `https://${userData.blog}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {userData.blog}
              </a>
            ) : (
              <span>Not Available</span>
            )}
          </li>

          <li className={`link-item ${!userData.company ? "disabled" : ""}`}>
            <img src="/company-icon.svg" alt="company" />
            <span>{userData.company || "Not Available"}</span>
          </li>
        </ul>
      </div>
    </article>
  ) : null;
}
