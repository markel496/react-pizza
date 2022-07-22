import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from './MyLoader.module.scss'

const MyLoader: React.FC = () => (
  <div className={styles.loader}>
    <ContentLoader
      speed={2}
      width={280}
      height={480}
      viewBox="0 0 280 480"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={styles.container}
    >
      <rect x="12" y="269" rx="10" ry="10" width="252" height="24" />
      <rect x="12" y="317" rx="10" ry="10" width="252" height="88" />
      <rect x="125" y="354" rx="0" ry="0" width="18" height="10" />
      <rect x="12" y="433" rx="10" ry="10" width="90" height="27" />
      <rect x="132" y="425" rx="30" ry="30" width="130" height="44" />
      <circle cx="130" cy="125" r="125" />
    </ContentLoader>
  </div>
)

export default MyLoader
