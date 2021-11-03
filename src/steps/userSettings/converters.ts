import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { Entities } from '../constants';
import {
  ZoomUserSettings,
  ZoomUserSettingsMeetingAuthentication,
  ZoomUserSettingsMeetingSecurity,
  ZoomUserSettingsRecordingAuthentication,
} from '../../types';

export function getUserSettingsKey(id: string): string {
  return `zoom_user_settings:${id}`;
}

export function createUserSettingsEntity(
  user: Entity,
  data: ZoomUserSettings &
    ZoomUserSettingsMeetingAuthentication &
    ZoomUserSettingsRecordingAuthentication &
    ZoomUserSettingsMeetingSecurity,
) {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _class: Entities.USER_SETTINGS._class,
        _type: Entities.USER_SETTINGS._type,
        _key: getUserSettingsKey(user.id as string),
        name: `${user.username} settings`,
        scheduleMeetingHostVideo: data.schedule_meeting?.host_video,
        scheduleMeetingParticipantsVideo:
          data.schedule_meeting?.participants_video,
        scheduleMeetingAudioType: data.schedule_meeting?.audio_type,
        scheduleMeetingJoinBeforeHost: data.schedule_meeting?.join_before_host,
        scheduleMeetingForcePmiJbhPassword:
          data.schedule_meeting?.force_pmi_jbh_password,
        scheduleMeetingPstnPasswordProtected:
          data.schedule_meeting?.pstn_password_protected,
        scheduleMeetingUsePmiForScheduledMeetings:
          data.schedule_meeting?.use_pmi_for_scheduled_meetings,
        scheduleMeetingUsePmiForInstantMeetings:
          data.schedule_meeting?.use_pmi_for_instant_meetings,
        scheduleMeetingRequirePasswordForScheduledmeetings:
          data.schedule_meeting?.require_password_for_scheduled_meetings,
        scheduleMeetingDefaultPasswordForScheduledMeetings:
          data.schedule_meeting?.default_password_for_scheduled_meetings,
        scheduleMeetingRequirePasswordForInstantMeetings:
          data.schedule_meeting?.require_password_for_instant_meetings,
        scheduleMeetingRequirePasswordForPmiMeetings:
          data.schedule_meeting?.require_password_for_pmi_meetings,
        scheduleMeetingPmiPassword: data.schedule_meeting?.pmi_password,
        scheduleMeetingEmbedPasswordInJoinLink:
          data.schedule_meeting?.embed_password_in_join_link,
        scheduleMeetingMeetingPasswordRequirementLength:
          data.schedule_meeting?.meeting_password_requirement?.length,
        scheduleMeetingMeetingPasswordRequirementHaveLetter:
          data.schedule_meeting?.meeting_password_requirement?.have_letter,
        scheduleMeetingMeetingPasswordRequirementHaveNumber:
          data.schedule_meeting?.meeting_password_requirement?.have_number,
        scheduleMeetingMeetingPasswordRequirementHaveSpecialCharacter:
          data.schedule_meeting?.meeting_password_requirement
            ?.have_special_character,
        scheduleMeetingMeetingPasswordRequirementOnlyAllowNumeric:
          data.schedule_meeting?.meeting_password_requirement
            ?.only_allow_numeric,
        scheduleMeetingMeetingPasswordRequirementHaveUpperAndLowerCharacters:
          data.schedule_meeting?.meeting_password_requirement
            ?.have_upper_and_lower_characters,
        scheduleMeetingMeetingPasswordRequirementConsecutiveCharactersLength:
          data.schedule_meeting?.meeting_password_requirement
            ?.consecutive_characters_length,
        scheduleMeetingMeetingPasswordRequirementWeakEnhanceDetection:
          data.schedule_meeting?.meeting_password_requirement
            ?.weak_enhance_detection,
        scheduleMeetingPersonalMeeting: data.schedule_meeting?.personal_meeting,
        scheduleMeetingRequirePasswordForSchedulingNewMeetings:
          data.schedule_meeting?.require_password_for_scheduling_new_meetings,
        scheduleMeetingMuteUponEntry: data.schedule_meeting?.mute_upon_entry,

        inMeetingAttendeeOnHold: data.in_meeting?.attendee_on_hold,
        inMeetingE2eEncryption: data.in_meeting?.e2e_encryption,
        inMeetingChat: data.in_meeting?.chat,
        inMeetingAllowParticipantsChatWith:
          data.in_meeting?.allow_participants_chat_with,
        inMeetingAllowUsersSaveChats: data.in_meeting?.allow_users_save_chats,
        inMeetingPrivateChat: data.in_meeting?.private_chat,
        inMeetingAutoSavingChat: data.in_meeting?.auto_saving_chat,
        inMeetingEntryExitChime: data.in_meeting?.entry_exit_chime,
        inMeetingRecordPlayVoice: data.in_meeting?.record_play_voice,
        inMeetingFeedbacl: data.in_meeting?.feedback,
        inMeetingCoHost: data.in_meeting?.co_host,
        inMeetingPolling: data.in_meeting?.polling,
        inMeetingAnnotation: data.in_meeting?.annotation,
        inMeetingRemoteControl: data.in_meeting?.remote_control,
        inMeetingNonVerbalFeedback: data.in_meeting?.non_verbal_feedback,
        inMeetingBreakoutRoom: data.in_meeting?.breakout_room,
        inMeetingBreakoutRoomSchedule: data.in_meeting?.breakout_room_schedule,
        inMeetingRemoteSupport: data.in_meeting?.remote_support,
        inMeetingClosedCaption: data.in_meeting?.closed_caption,
        inMeetingGroupHd: data.in_meeting?.group_hd,
        inMeetingVirtualBackground: data.in_meeting?.virtual_background,
        inMeetingVirtualBackgroundSettingsEnable:
          data.in_meeting?.virtual_background_settings?.enable,
        inMeetingVirtualBackgroundSettingsAllowVideos:
          data.in_meeting?.virtual_background_settings?.allow_videos,
        inMeetingVirtualBackgroundSettingsAllowUploadCustom:
          data.in_meeting?.virtual_background_settings?.allow_upload_custom,
        inMeetingFarEndCameraControl: data.in_meeting?.far_end_camera_control,
        inMeetingShareDualCamera: data.in_meeting?.share_dual_camera,
        inMeetingWaitingRoom: data.in_meeting?.waiting_room,
        inMeetingAllowLiveStreaming: data.in_meeting?.allow_live_streaming,
        inMeetingLiveStreamingFacebook:
          data.in_meeting?.live_streaming_facebook,
        inMeetingWorkplaceByFacebook: data.in_meeting?.workplace_by_facebook,
        inMeetingLiveStreamingYoutube: data.in_meeting?.live_streaming_youtube,
        inMeetingCustomLiveStreamingService:
          data.in_meeting?.custom_live_streaming_service,
        inMeetingCustomServiceInstructions:
          data.in_meeting?.custom_service_instructions,
        inMeetingShowMeetingControlToolbar:
          data.in_meeting?.show_meeting_control_toolbar,
        inMeetingCustomDataCenterRegions:
          data.in_meeting?.custom_data_center_regions,
        inMeetingDataCenterRegions: data.in_meeting?.data_center_regions,
        inMeetingMeetingReactions: data.in_meeting?.meeting_reactions,
        inMeetingScreenSharing: data.in_meeting?.screen_sharing,
        inMeetingWhoCanShareScreen: data.in_meeting?.who_can_share_screen,
        inMeetingWhoCanShareScreenWhenSomeoneIsSharing:
          data.in_meeting?.who_can_share_screen_when_someone_is_sharing,
        inMeetingFileTransfer: data.in_meeting?.file_transfer,
        inMeetingRequestPermissionToUnmute:
          data.in_meeting?.request_permission_to_unmute,
        inMeetingAllowParticipantsToRename:
          data.in_meeting?.allow_participants_to_rename,
        inMeetingRequestPermissionToUnmuteParticipants:
          data.in_meeting?.request_permission_to_unmute_participants,
        inMeetingShowAJoinFromYourBrowserLink:
          data.in_meeting?.show_a_join_from_your_browser_link,
        inMeetingJoinFromMobile: data.in_meeting?.join_from_mobile,
        inMeetingJoinFromDesktop: data.in_meeting?.join_from_desktop,
        inMeetingWebinarLiveStreamingEnable:
          data.in_meeting?.webinar_live_streaming?.enable,
        inMeetingWebinarLiveStreamingLiveStreamingService:
          data.in_meeting?.webinar_live_streaming?.live_streaming_service,
        inMeetingWebinarLiveStreamingCustomServiceInstructions:
          data.in_meeting?.webinar_live_streaming?.custom_service_instructions,
        inMeetingWebinarLiveStreamingLiveStreamingReminder:
          data.in_meeting?.webinar_live_streaming?.live_streaming_reminder,
        inMeetingWebinarChatEnable: data.in_meeting?.webinar_chat?.enable,
        inMeetingWebinarChatAllowPanelistsChatWith:
          data.in_meeting?.webinar_chat?.allow_panelists_chat_with,
        inMeetingWebinarChatAllowAttendeesChatWith:
          data.in_meeting?.webinar_chat?.allow_attendees_chat_with,
        inMeetingWebinarChatDefaultAttendeesChatWith:
          data.in_meeting?.webinar_chat?.default_attendees_chat_with,
        inMeetingWebinarChatAllowPanelistsSendDirectMessage:
          data.in_meeting?.webinar_chat?.allow_panelists_send_direct_message,
        inMeetingWebinarChatAllowUsersSaveChats:
          data.in_meeting?.webinar_chat?.allow_users_save_chats,
        inMeetingWebinarChatAllowAutoSaveLocalChatFile:
          data.in_meeting?.webinar_chat?.allow_auto_save_local_chat_file,

        emailNotificationCloudRecordingAvailableReminder:
          data.email_notification?.cloud_recording_available_reminder,
        emailNotificationJbhReminder: data.email_notification?.jbh_reminder,
        emailNotificationCancelMeetingReminder:
          data.email_notification?.cancel_meeting_reminder,
        emailNotificationAlternativeHostReminder:
          data.email_notification?.alternative_host_reminder,
        emailNotificationScheduleForReminder:
          data.email_notification?.schedule_for_reminder,

        recordingLocalRecording: data.recording?.local_recording,
        recordingCloudRecording: data.recording?.cloud_recording,
        recordingRecordSpeakerView: data.recording?.record_speaker_view,
        recordingRecordGalleryView: data.recording?.record_gallery_view,
        recordingRecordAudioFile: data.recording?.record_audio_file,
        recordingSaveChatText: data.recording?.save_chat_text,
        recordingShowTimestamp: data.recording?.show_timestamp,
        recordingRecordingAudioTranscript:
          data.recording?.recording_audio_transcript,
        recordingAutoRecording: data.recording?.auto_recording,
        recordingHostPauseStopRecording:
          data.recording?.host_pause_stop_recording,
        recordingAutoDeleteCmr: data.recording?.auto_delete_cmr,
        recordingAutoDeleteCmrData: data.recording?.auto_delete_cmr_data,
        recordingHostDeleteCloudRecording:
          data.recording?.host_delete_cloud_recording,
        recordingRequirePasswordForSharedCloudRecordings:
          data.recording?.required_password_for_shared_cloud_recordings,
        recordingRecordingDisclaimer: data.recording?.recording_disclaimer,
        recordingAskParticipantsToConsentDisclaimer:
          data.recording?.ask_participants_to_consent_disclaimer,
        recordingAskHostToConfirmDisclaimer:
          data.recording?.ask_host_to_confirm_disclaimer,
        recordingRecordingPasswordRequirementLength:
          data.recording?.recording_password_requirement?.length,
        recordingRecordingPasswordRequirementHaveLetter:
          data.recording?.recording_password_requirement?.have_letter,
        recordingRecordingPasswordRequirementHaveNumber:
          data.recording?.recording_password_requirement?.have_number,
        recordingRecordingPasswordRequirementHaveSpecialCharacter:
          data.recording?.recording_password_requirement
            ?.have_special_character,
        recordingRecordingPasswordRequirementOnlyAllowNumeric:
          data.recording?.recording_password_requirement?.only_allow_numeric,
        recordingIpAddressAccessControlEnable:
          data.recording?.ip_address_access_control?.enable,
        recordingIpAddressAccessControlIpAddressesOrRanges:
          data.recording?.ip_address_access_control?.ip_addresses_or_ranges,

        telephonyThirdPartyAudio: data.telephony?.third_party_audio,
        telephonyAudioConferenceInfo: data.telephony?.audio_conference_info,
        telephonyShowInternationalNumbersLink:
          data.telephony?.show_international_numbers_link,
        telephonyTelephonyRegionsAllowedValues:
          data.telephony?.telephony_regions?.allowed_values,
        telephonyTelephonyRegionsSelectionValue:
          data.telephony?.telephony_regions?.selection_value,

        featureMeetingCapacity: data.feature?.meeting_capacity,
        featureLargeMeeting: data.feature?.large_meeting,
        featureLargeMeetingCapacity: data.feature?.large_meeting_capacity,
        featureWebinar: data.feature?.webinar,
        featureWebinarCapacity: data.feature?.webinar_capacity,
        featureZoomEvents: data.feature?.zoom_events,
        featureZoomEventsCapacity: data.feature?.zoom_events_capacity,
        featureCnMeeting: data.feature?.cn_meeting,
        featureInMeeting: data.feature?.in_meeting,
        featureZoomPhone: data.feature?.zoom_phone,
        featureConcurrentMeeting: data.feature?.concurrent_meeting,

        tspCallOut: data.tsp?.call_out,
        tspCallOutCountries: data.tsp?.call_out_countries,
        tspShowInternationalNumbersLink:
          data.tsp?.show_international_numbers_link,

        profileRecordingStorageLocationAllowedValues:
          data.profile?.recording_storage_location?.allowed_values,
        profileRecordingStorageLocationValue:
          data.profile?.recording_storage_location?.value,

        audioConferencingTollFreeAndFeeBasedTollCallEnable:
          data.audio_conferencing?.toll_free_and_fee_based_toll_call?.enable,
        audioConferencingTollFreeAndFeeBasedTollCallAllowWebinarAttendeesDial:
          data.audio_conferencing?.toll_free_and_fee_based_toll_call
            ?.allow_webinar_attendees_dial,

        meetingAuthentication: data.meeting_authentication,
        recordingAuthentication: data.recording_authentication,

        meetingSecurityEmbedPasswordInJoinLink:
          data.meeting_security?.embed_password_in_join_link,
        meetingSecurityEndToEndEncryptedMeetings:
          data.meeting_security?.end_to_end_encrypted_meetings,
        meetingSecurityEncryptionType: data.meeting_security?.encryption_type,
        meetingSecurityMeetingPassword: data.meeting_security?.meeting_password,
        meetingSecurityMeetingPasswordRequirementLength:
          data.meeting_security?.meeting_password_requirement?.length,
        meetingSecurityMeetingPasswordRequirementHaveLetter:
          data.meeting_security?.meeting_password_requirement?.have_letter,
        meetingSecurityMeetingPasswordRequirementHaveNumber:
          data.meeting_security?.meeting_password_requirement?.have_number,
        meetingSecurityMeetingPasswordRequirementHaveSpecialCharacter:
          data.meeting_security?.meeting_password_requirement
            ?.have_special_character,
        meetingSecurityMeetingPasswordRequirementOnlyAllowNumeric:
          data.meeting_security?.meeting_password_requirement
            ?.only_allow_numeric,
        meetingSecurityMeetingPasswordRequirementHaveUpperAndLowerCharacters:
          data.meeting_security?.meeting_password_requirement
            ?.have_upper_and_lower_characters,
        meetingSecurityMeetingPasswordRequirementConsecutiveCharactersLength:
          data.meeting_security?.meeting_password_requirement
            ?.consecutive_characters_length,
        meetingSecurityMeetingPasswordRequirementWeakEnhanceDetection:
          data.meeting_security?.meeting_password_requirement
            ?.weak_enhance_detection,
        meetingSecurityPhonePassword: data.meeting_security?.phone_password,
        meetingSecurityPmiPassword: data.meeting_security?.pmi_password,
        meetingSecurityPasswordForPmi: data.meeting_security?.password_for_pmi,
        meetingSecurityRequirePasswordForScheduledMeeting:
          data.meeting_security?.require_password_for_scheduled_meeting,
        meetingSecurityWebinarPassword: data.meeting_security?.webinar_password,
        meetingSecurityRequirePasswordForScheduledWebinar:
          data.meeting_security?.require_password_for_scheduled_webinar,
        meetingSecurityWaitingRoom: data.meeting_security?.waiting_room,
        meetingSecurityWaitingRoomSettingsParticipantsToPlaceInWaitingRoom:
          data.meeting_security?.waiting_room_settings
            ?.participants_to_place_in_waiting_room,
        meetingSecurityWaitingRoomSettingsWhitelistedDomainsForWaitingRoom:
          data.meeting_security?.waiting_room_settings
            ?.whitelisted_domains_for_waiting_room,
        meetingSecurityWaitingRoomSettingsUsersWhoCanAdmitParticipantsFromWaitingRoom:
          data.meeting_security?.waiting_room_settings
            ?.users_who_can_admit_participants_from_waiting_room,
        meetingSecurityAutoSecurity: data.meeting_security?.auto_security,
        meetingSecurityBlockUserDomain:
          data.meeting_security?.block_user_domain,
        meetingSecurityBlockUserDomainList:
          data.meeting_security?.block_user_domain_list,
        meetingSecurityApprovedOrDeniedCountriesOrRegionsEnable:
          data.meeting_security?.approved_or_denied_countries_or_regions.enable,
      },
    },
  });
}
