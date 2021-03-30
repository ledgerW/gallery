const dev = {
  Auth: {
      identityPoolId: 'us-east-1:a1b29beb-8f9c-4ae0-808d-6488ce43e5f1',
      region: 'us-east-1'
  },
  Storage: {
      AWSS3: {
          bucket: 'gallery-content11249-dev', 
          region: 'us-east-1'
      }
  },
  predictions: {
    convert: {
        speechGenerator: {
            region: "us-east-1",
            proxy: false,
            defaults: {
                VoiceId: "Kendra",
                LanguageCode: "en-US"
            }
        }
    }
  }
};

const prod = {
  Auth: {
      identityPoolId: 'us-east-1:6b2ec93c-534d-49bf-9221-606b679c7599',
      region: 'us-east-1'
  },
  Storage: {
      AWSS3: {
          bucket: 'gallery-content212037-prod', 
          region: 'us-east-1'
      }
  },
  predictions: {
    convert: {
        speechGenerator: {
            region: "us-east-1",
            proxy: false,
            defaults: {
                VoiceId: "Kendra",
                LanguageCode: "en-US"
            }
        }
    }
  }
};

// Default to dev if not set
const config = process.env.STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  // MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};