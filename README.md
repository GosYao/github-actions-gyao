# Wiz Code GitHub Actions Demo :magic_wand:

This demo environment showcases the CI/CD features of Wiz Code using a real world GitOps workflow. The repository includes Terraform scripts to deploy an AWS ECR registry and an EKS cluster with the Wiz Kubernetes connector, sensor, admission controller, and audit log collector. GitHub Actions workflows manage the build, publishing, and deployment of a Node.js containerized app, along with WizCLI jobs for directory, IaC, and image scanning. The repo itself can also be leveraged and customized to test the VCS connector, PR scanning, image trust, admission control, registry scanning, and the VS Code WizCLI extension.

Please reach out if you have any questions or need help troubleshooting!

<img src="https://github.com/wiz-sec/wiz-code-gha-demo/raw/main/images/gha.png">

## Table of Contents

1. [Introduction](#wiz-code-github-actions-demo-magic_wand)
2. [Video Walkthroughs](#video-walkthroughs)
   - [Setup & Deployment](#setup-and-deployment)
3. [Setup](#setup)
4. [Destroy Demo Process](#destory-demo-process-boom)
5. [Contact](#contact) 

## Video Walkthroughs

<a name="setup-and-deployment"></a>
:tv: **Setup & Deployment:** 

<a href="https://beyondnetworkscom-my.sharepoint.com/:v:/g/personal/derek_christensen_wiz_io/EdN3Gqax1OZAq2X1YsOLEJ0BmBpkGsIPjbMFiK1DKPA52Q?e=1LABka" target="_blank">
  <img src="https://github.com/wiz-sec/wiz-code-gha-demo/raw/main/images/video1.png" alt="Setup & Deployment" width="600"/>
</a>

## Setup

**Step 1:** Clone or download repo locally.

```bash
  git clone https://github.com/wiz-sec/wiz-code-gha-demo
```

---
**Step 2:** Create a New Private Repository on GitHub.

1. Go to GitHub and log in to your account.
2. Click on the **+** icon in the upper right corner and select **New repository**.
3. Name your new repository "wiz-code-gha-demo" and set it to **Private**.
4. Do not initialize the new repository with a README, .gitignore, or license, as you'll be pushing an existing repository.<br>

---
**Step 3:** Push the Cloned Repository to the New Private Repository.

1. Change the directory to your cloned repository:
   ```sh
   cd wiz-code-gha-demo
   ```
2. Add the URL of your new private repository as a remote and push the cloned repository to your new private repository.
    ```sh
    git remote remove origin
    git remote add origin https://github.com/ <your-username> /wiz-code-gha-demo.git
    git branch -M main
    git push -u origin main
    ```

---
**Step 4:** Deploy demo infrastructure. Run Terraform code under '/terraform'.<br><br>
Install Terraform - https://developer.hashicorp.com/terraform/install <br>

:rotating_light: Make sure to update the 'terraform/variables.tf' file to include your Wiz service account credentials (Complete Kubernetes Integration) and the Docker credentials for the Wiz Sensor.

| Terraform Variable             | Value                                                               |
| ----------------- | ------------------------------------------------------------------ |
| sensor_pullkey_username | https://app.wiz.io/tenant-info/general (Wiz Registry Credentials) |
| sensor_pullkey_password | https://app.wiz.io/tenant-info/general (Wiz Registry Credentials) |
| wiz_service_account_id | Client ID (Complete K8s Integration) - CSAProd |
| wiz_service_account_token | Client Secret (Complete K8s Integration) - CSAProd |

Deploy Terraform Code Commands:

```bash
  cd /wiz-code-gha-demo/terraform
  terraform init
  terraform plan
  terraform apply
```

---
**Step 5:** Add secrets to GitHub Actions pipeline within your new GitHub repository.<br>

Install AWS CLI - https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

Install kubectl - https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html

  ```bash
  https://github.com/ <your-username> /wiz-code-gha-demo/settings/secrets/actions
  ```

| Secrets             | How To Get Secret                                                               |
| ----------------- | ------------------------------------------------------------------ |
| AWS_ACCESS_KEY_ID | Obtain from AWS console or CLI |
| AWS_DEFAULT_REGION | Obtain from AWS console or CLI |
| AWS_SECRET_ACCESS_KEY | Obtain from AWS console or CLI |
| CONTAINER_REGISTRY | Obtain from AWS console within the ECR section.<br>Example: `058264066618.dkr.ecr.us-west-2.amazonaws.com` |
| KUBE_CONFIG | Run the following command to obtain kube config.<br> <code>aws eks update-kubeconfig --name &lt;insert EKS cluster name&gt; --region &lt;insert region&gt; && cat ~/.kube/config &#124; base64</code> |
| PAT | Generate GitHub Personal Access Token. Ensure token has git repository access privilleges.<br>https://github.com/settings/tokens |
| REGISTRY_UN | `AWS` - No need to update. Leave as 'AWS'. |
| REGISTRY_PW | Run the following command to obtain ECR password.<br>:rotating_light: Will expire every 12 hours so update if needed.<br>`aws ecr get-login-password --region <your-region>` |
| WIZ_CLIENT_ID | WizCLI Client ID - Custom Integration (GraphQL API)|
| WIZ_CLIENT_SECRET | WizCLI Client - Secret Custom Integration (GraphQL API)|

---
**Step 6:** Run WizCLI Enabled Pipeline

<img src="https://github.com/wiz-sec/wiz-code-gha-demo/raw/main/images/pipeline.png">

---
**Step 7:** Wiz PR Scanning

1. Ensure Wiz VCS connector is configured.
2. Create new branch.
3. Edit files. Add sensitive data or specific files/folders that will trigger vuln and IaC scanner.
4. Create PR.

<img src="https://github.com/wiz-sec/wiz-code-gha-demo/raw/main/images/pr.png">

## Destory Demo Process :boom:

Run each command individually in order. Ensure the Helm chart and app service have been deleted prior to running Terraform destroy or the destroy job will fail and you may end up having to manually delete resources within AWS.

```bash
  helm uninstall wiz-integration --namespace wiz
```
```bash
  kubectl delete service app
```
```bash
  terraform destroy -auto-approve
```

## Contact :mage_man:

Gos Yao - Gos.Yao@gmail.com
