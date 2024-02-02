import { NavLink, Form, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  // ! we already know that is will be the token
  // ! because that is what our loader does return
  // ? and id of 'token' is the id that we left inside the root route
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) => (isActive ? classes.active : undefined)}
            >
              Newsletter
            </NavLink>
          </li>

          {!token && (
            <li>
              <NavLink
                to="auth?mode=signup"
                className={({ isActive }) => (isActive ? classes.active : undefined)}
              >
                Authentification
              </NavLink>
            </li>
          )}

          {token && (
            <li>
              {/* ! here we point to the action on the '/logout' rout is based ! */}
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
