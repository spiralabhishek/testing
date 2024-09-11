import React from 'react'
import ActivityModal from './ActivityModal'
import AssetManagementModal from './AssetManagementModal'
import AwarenessModal from './AwarenessModal'
import BannerModal from './BannerModal'
import PriceListModal from './PriceListModal'
import FaqModal from './FaqModal'
import ProfileModal from './ProfileModal'
import ShareModal from './ShareModal'
import TeamModal from './TeamModal'

const ModalGroup = () => {
  return (
    <>
      <ActivityModal />
      <AssetManagementModal />
      <AwarenessModal />
      <BannerModal />
      <FaqModal />
      <PriceListModal />
      <ProfileModal />
      <ShareModal />
      <TeamModal />
    </>
  )
}

export default ModalGroup
