# BM Engineering Motion System — 23 November 2026

Baseline: released main b0e18e06d125187502dd25e7f5da45f90b380c8a. No new service routes or product records.

| Published route                          | Selected treatment                                        | Decision                                                            |
| ---------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| /services/cctv                           | Original photographic hero; no added motion strip | Removed at owner request; packages, imagery and customer belt retained |
| /services/electric-fence                 | Travelling conductor highlight below hero photograph      | Add; preserve equipment/models and customer belt                    |
| /services/gate-motors                    | Existing user-operated gate explanation                   | Preserve; no competing hero loop                                    |
| /services/access-control                 | Existing controlled recognition/workflow signal           | Preserve                                                            |
| /services/access-control/time-attendance | Existing attendance workflow                              | Preserve                                                            |
| /services/access-control/smart-locks     | Existing access-control presentation                      | Preserve; caption cleanup only                                      |
| /services/fire-alarm-systems             | Detection pulse + reviewed infrastructure photograph      | Add to previously generic composition                               |
| /services/video-intercom                 | Communication wave + entrance imagery                     | Add                                                                 |
| /services/hikvision                      | Existing architectural diagram, four independent paths    | Preserve                                                            |
| /services/electrical-contracting         | Existing in-view current-distribution illustration        | Preserve, including hidden/offscreen control                        |
| /services/generators                     | Existing native ATS/AMF sequence                          | Preserve                                                            |
| /services/solar-panel-systems            | Existing controlled energy flow                           | Preserve                                                            |
| /services/power-backup                   | Existing four-state continuity flow                       | Preserve                                                            |
| /services/solar-street-lights            | Daylight-to-light signal and existing solar imagery       | Add                                                                 |
| /services/networking                     | Original networking hero; no added motion strip | Removed at owner request                                                                 |
| /services/telephone-systems              | Extension-to-extension communication wave                 | Add                                                                 |
| /services/pa-sound-systems               | Existing acoustic signal illustration                     | Preserve                                                            |
| /services/air-conditioners               | Directional airflow                                       | Add                                                                 |
| /services/maintenance-support            | Inspection scan                                           | Add                                                                 |
| /services/institutional-procurement      | Coordinated equipment traces                              | Add                                                                 |
| /services                                | Compact coordinated-building illustration                 | Add to directory hero                                               |

Shared server-rendered SVG geometry and a small lifecycle controller. No homepage ribbon renderer, second WebGL scene, animation library, remote media or new image bytes. Illustrations are conceptual, not wiring or safety instructions. They sit below photographs rather than over faces, equipment markings or actions.

Motion is static without JavaScript, reduced motion or data saving; offscreen/hidden activity pauses. A labelled compact pause/play button and Alt+P preserve independent control. Existing specialist diagrams remain unchanged, avoiding competing loops. Manufacturer product/catalogue pages are unchanged.

## Owner refinement — 23 November 2026

CCTV and Networking no longer render the added engineering-motion strips. Contact and Request Site Survey reuse the released Champagne Current renderer as a softened background behind the three-stage form and introduction. The form remains opaque, readable and interactive; the homepage renderer itself is unchanged. Reduced motion, static fallback, offscreen/hidden handling and Alt+P are inherited from HeroLight. No deployment or new dependency. This local refinement supersedes the previous frozen preview candidate pending a fresh review/freeze.
